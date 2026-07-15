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

app.get('/words/random', async (req, res) => {
  const excludeId = req.query.exclude ? Number(req.query.exclude) : undefined
  const difficulty = req.query.difficulty ? Number(req.query.difficulty) : undefined

  const baseWhere: { difficulty?: number } = {}
  if (difficulty) baseWhere.difficulty = difficulty

  const where: { id?: { not: number }; difficulty?: number } = { ...baseWhere }
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
