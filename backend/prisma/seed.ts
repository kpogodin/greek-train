import { prisma } from '../src/prisma.js'

const words = [
  {
    translationRu: 'здравствуйте (утром)',
    pronunciation: 'калимЭра',
    forms: ['καλημέρα'],
  },
  {
    translationRu: 'спасибо',
    pronunciation: 'эфхаристО',
    forms: ['ευχαριστώ'],
  },
  {
    translationRu: 'дом',
    pronunciation: 'спИти',
    forms: ['το σπίτι', 'του σπιτιού', 'τα σπίτια'],
  },
]

async function main() {
  for (const w of words) {
    await prisma.word.create({
      data: {
        translationRu: w.translationRu,
        pronunciation: w.pronunciation,
        forms: { create: w.forms.map((form) => ({ form })) },
      },
    })
  }
  console.log(`Seeded ${words.length} words`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
