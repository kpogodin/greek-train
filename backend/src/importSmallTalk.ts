import 'dotenv/config'
import { createReadStream } from 'node:fs'
import { parse } from 'csv-parse'
import { prisma } from './prisma.js'

// Expected CSV columns: prompt_ru, phrase_greek, translation_ru, pronunciation_ru
// Rows sharing the same prompt_ru are grouped into one SmallTalkPrompt.
async function importSmallTalk(filePath: string) {
  const parser = createReadStream(filePath).pipe(
    parse({ columns: true, skip_empty_lines: true }),
  )

  const promptIds = new Map<string, number>()
  let promptCount = 0
  let variantCount = 0

  for await (const row of parser) {
    const promptRu = row.prompt_ru ?? ''
    let promptId = promptIds.get(promptRu)
    if (promptId === undefined) {
      const prompt = await prisma.smallTalkPrompt.create({ data: { promptRu } })
      promptId = prompt.id
      promptIds.set(promptRu, promptId)
      promptCount++
    }

    await prisma.smallTalkVariant.create({
      data: {
        promptId,
        phraseGreek: row.phrase_greek ?? '',
        translationRu: row.translation_ru ?? '',
        pronunciation: row.pronunciation_ru ?? '',
      },
    })
    variantCount++
  }

  console.log(`Imported ${promptCount} prompts with ${variantCount} variants from ${filePath}`)
}

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: npm run import-smalltalk -- <path-to-csv>')
  process.exit(1)
}

importSmallTalk(filePath)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
