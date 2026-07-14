import 'dotenv/config'
import { createReadStream } from 'node:fs'
import { parse } from 'csv-parse'
import { prisma } from './prisma.js'

// Expected CSV columns: forms (semicolon-separated Greek word forms), pronunciation, translation_ru, category
async function importCsv(filePath: string) {
  const parser = createReadStream(filePath).pipe(
    parse({ columns: true, skip_empty_lines: true }),
  )

  let count = 0
  for await (const row of parser) {
    const forms = String(row.forms ?? '')
      .split(';')
      .map((f) => f.trim())
      .filter(Boolean)

    await prisma.word.create({
      data: {
        translationRu: row.translation_ru ?? '',
        pronunciation: row.pronunciation || null,
        category: row.category || null,
        forms: { create: forms.map((form) => ({ form })) },
      },
    })
    count++
  }

  console.log(`Imported ${count} words from ${filePath}`)
}

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: npm run import-csv -- <path-to-csv>')
  process.exit(1)
}

importCsv(filePath)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
