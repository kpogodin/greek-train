import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { prisma } from './prisma.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/words', async (_req, res) => {
  const words = await prisma.word.findMany({ include: { forms: true } })
  res.json(words)
})

app.get('/words/categories', async (req, res) => {
  const learnerName = typeof req.query.learner === 'string' ? req.query.learner.trim() : undefined

  const grouped = await prisma.word.groupBy({
    by: ['category'],
    _count: { category: true },
  })
  const categories = grouped
    .filter((g) => g.category)
    .map((g) => ({ category: g.category as string, count: g._count.category, learned: 0 }))
    .sort((a, b) => b.count - a.count)

  if (learnerName) {
    const progress = await prisma.wordProgress.findMany({
      where: { learnerName },
      select: { wordId: true },
    })
    const wordIds = progress.map((p) => p.wordId)
    if (wordIds.length > 0) {
      const learnedWords = await prisma.word.findMany({
        where: { id: { in: wordIds } },
        select: { category: true },
      })
      const learnedByCategory = new Map<string, number>()
      for (const w of learnedWords) {
        if (!w.category) continue
        learnedByCategory.set(w.category, (learnedByCategory.get(w.category) ?? 0) + 1)
      }
      for (const c of categories) {
        c.learned = learnedByCategory.get(c.category) ?? 0
      }
    }
  }

  res.json(categories)
})

app.post('/progress/word', async (req, res) => {
  const learnerName = typeof req.body.learnerName === 'string' ? req.body.learnerName.trim() : ''
  const wordId = Number(req.body.wordId)
  if (!learnerName || !wordId) {
    res.status(400).json({ error: 'learnerName and wordId are required' })
    return
  }

  await prisma.wordProgress.upsert({
    where: { learnerName_wordId: { learnerName, wordId } },
    create: { learnerName, wordId, timesSeen: 1 },
    update: { timesSeen: { increment: 1 } },
  })
  res.json({ ok: true })
})

app.post('/progress/conjugation', async (req, res) => {
  const learnerName = typeof req.body.learnerName === 'string' ? req.body.learnerName.trim() : ''
  const sentenceId = Number(req.body.sentenceId)
  if (!learnerName || !sentenceId) {
    res.status(400).json({ error: 'learnerName and sentenceId are required' })
    return
  }

  await prisma.conjugationProgress.upsert({
    where: { learnerName_sentenceId: { learnerName, sentenceId } },
    create: { learnerName, sentenceId, timesCorrect: 1 },
    update: { timesCorrect: { increment: 1 } },
  })
  res.json({ ok: true })
})

app.get('/words/random', async (req, res) => {
  const excludeId = req.query.exclude ? Number(req.query.exclude) : undefined
  const category = typeof req.query.category === 'string' ? req.query.category : undefined

  const baseWhere: { category?: string } = {}
  if (category) baseWhere.category = category

  const where: { id?: { not: number }; category?: string } = { ...baseWhere }
  if (excludeId) where.id = { not: excludeId }

  const count = await prisma.word.count({ where })
  if (count === 0) {
    const word = await prisma.word.findFirst({ where: baseWhere, include: { forms: true } })
    res.json(word ?? null)
    return
  }

  const skip = Math.floor(Math.random() * count)
  const word = await prisma.word.findFirst({ where, skip, include: { forms: true } })
  res.json(word)
})

app.get('/smalltalk/random', async (req, res) => {
  const excludeId = req.query.exclude ? Number(req.query.exclude) : undefined
  const where: { id?: { not: number } } = {}
  if (excludeId) where.id = { not: excludeId }

  const count = await prisma.smallTalkPrompt.count({ where })
  if (count === 0) {
    const prompt = await prisma.smallTalkPrompt.findFirst({ include: { variants: true } })
    res.json(prompt ?? null)
    return
  }

  const skip = Math.floor(Math.random() * count)
  const prompt = await prisma.smallTalkPrompt.findFirst({
    where,
    skip,
    include: { variants: true },
  })
  res.json(prompt)
})

app.post('/progress/smalltalk', async (req, res) => {
  const learnerName = typeof req.body.learnerName === 'string' ? req.body.learnerName.trim() : ''
  const promptId = Number(req.body.promptId)
  if (!learnerName || !promptId) {
    res.status(400).json({ error: 'learnerName and promptId are required' })
    return
  }

  await prisma.smallTalkProgress.upsert({
    where: { learnerName_promptId: { learnerName, promptId } },
    create: { learnerName, promptId, timesKnown: 1 },
    update: { timesKnown: { increment: 1 } },
  })
  res.json({ ok: true })
})

app.get('/conjugation/random', async (req, res) => {
  const group = Number(req.query.group ?? 1)
  const excludeId = req.query.exclude ? Number(req.query.exclude) : undefined

  const where: { group: number; id?: { not: number } } = { group }
  if (excludeId) where.id = { not: excludeId }

  const count = await prisma.conjugationSentence.count({ where })
  if (count === 0) {
    const sentence = await prisma.conjugationSentence.findFirst({ where: { group } })
    res.json(sentence ?? null)
    return
  }

  const skip = Math.floor(Math.random() * count)
  const sentence = await prisma.conjugationSentence.findFirst({ where, skip })
  res.json(sentence)
})

const port = Number(process.env.PORT ?? 3001)
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
