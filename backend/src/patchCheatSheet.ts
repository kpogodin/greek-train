import 'dotenv/config'
import { prisma } from './prisma.js'

// One-off, idempotent patch that adds the handful of items from the Greek A1
// cheat sheet that weren't already in a2_greek_vocabulary.csv: the negation
// particle, a couple of missing prepositions, and the full conjugation of
// είμαι (only the bare infinitive-ish form was in the DB before).

async function addFormsToWord(matchForm: string, newForms: string[]) {
  const wordForm = await prisma.wordForm.findFirst({ where: { form: matchForm } })
  if (!wordForm) {
    console.log(`Could not find word with form "${matchForm}", skipping`)
    return
  }
  const existing = await prisma.wordForm.findMany({ where: { wordId: wordForm.wordId } })
  const existingSet = new Set(existing.map((f) => f.form))
  const toAdd = newForms.filter((f) => !existingSet.has(f))
  if (toAdd.length === 0) {
    console.log(`All forms already present for "${matchForm}"`)
    return
  }
  await prisma.wordForm.createMany({
    data: toAdd.map((form) => ({ wordId: wordForm.wordId, form })),
  })
  console.log(`Added forms [${toAdd.join(', ')}] to word ${wordForm.wordId} (${matchForm})`)
}

async function upsertWord(
  forms: string[],
  pronunciation: string,
  translationRu: string,
  category: string,
) {
  const existing = await prisma.word.findFirst({ where: { translationRu } })
  if (existing) {
    console.log(`Skip existing word: ${translationRu}`)
    return
  }
  await prisma.word.create({
    data: {
      translationRu,
      pronunciation,
      category,
      forms: { create: forms.map((form) => ({ form })) },
    },
  })
  console.log(`Created word: ${translationRu}`)
}

async function main() {
  await addFormsToWord('είμαι', ['είσαι', 'είναι', 'είμαστε', 'είστε'])

  await upsertWord(['δεν'], 'дэн', 'не (отрицание)', 'служебные слова')
  await upsertWord(['προς'], 'прос', 'к, по направлению к', 'служебные слова')
  await upsertWord(['μέχρι'], 'мЭхри', 'до, вплоть до', 'служебные слова')
  await upsertWord(['πάνω σε'], 'пАно сэ', 'на, поверх', 'служебные слова')
  await upsertWord(['κάτω από'], 'кАто апО', 'под', 'служебные слова')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
