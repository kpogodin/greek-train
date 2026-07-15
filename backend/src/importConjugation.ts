import 'dotenv/config'
import { createReadStream } from 'node:fs'
import { parse } from 'csv-parse'
import { prisma } from './prisma.js'

// Expected CSV columns: before, after, correct_answer, verb_lemma, translation_ru, pronunciation_ru
async function importConjugation(filePath: string, group: number) {
  const parser = createReadStream(filePath).pipe(
    parse({ columns: true, skip_empty_lines: true }),
  )

  let count = 0
  for await (const row of parser) {
    await prisma.conjugationSentence.create({
      data: {
        group,
        before: row.before ?? '',
        after: row.after ?? '',
        correctAnswer: row.correct_answer ?? '',
        verbLemma: row.verb_lemma ?? '',
        translationRu: row.translation_ru ?? '',
        pronunciation: row.pronunciation_ru ?? '',
      },
    })
    count++
  }

  console.log(`Imported ${count} conjugation sentences from ${filePath} (group ${group})`)
}

const filePath = process.argv[2]
const group = Number(process.argv[3] ?? 1)
if (!filePath) {
  console.error('Usage: npm run import-conjugation -- <path-to-csv> [group]')
  process.exit(1)
}

importConjugation(filePath, group)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
