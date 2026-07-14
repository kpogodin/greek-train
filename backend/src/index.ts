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
  const where = excludeId ? { id: { not: excludeId } } : undefined

  const count = await prisma.word.count({ where })
  if (count === 0) {
    const word = await prisma.word.findFirst({ include: { forms: true } })
    res.json(word ?? null)
    return
  }

  const skip = Math.floor(Math.random() * count)
  const word = await prisma.word.findFirst({ where, skip, include: { forms: true } })
  res.json(word)
})

const port = Number(process.env.PORT ?? 3001)
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
