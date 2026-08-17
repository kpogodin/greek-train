import 'dotenv/config'
import { prisma } from './prisma.js'

// One-off, idempotent patch that adds example phrases (Greek + pronunciation +
// Russian translation) to prepositions and conjunctions already in the DB.

async function setExample(
  matchForm: string,
  exampleGreek: string,
  examplePronunciation: string,
  exampleTranslationRu: string,
) {
  const wordForm = await prisma.wordForm.findFirst({ where: { form: matchForm } })
  if (!wordForm) {
    console.log(`Could not find word with form "${matchForm}", skipping`)
    return
  }
  await prisma.word.update({
    where: { id: wordForm.wordId },
    data: { exampleGreek, examplePronunciation, exampleTranslationRu },
  })
  console.log(`Set example for "${matchForm}"`)
}

async function main() {
  await setExample('σε (στο, στη, στον)', 'Είμαι στο σχολείο.', 'И́мэ сто схолИо.', 'Я в школе.')
  await setExample('από', 'Είμαι από τη Ρωσία.', 'И́мэ апо́ ти РосИа.', 'Я из России.')
  await setExample('με', 'Έρχομαι με το αυτοκίνητο.', 'Э́рхомэ мэ то афтокИнито.', 'Я приезжаю на машине.')
  await setExample('χωρίς', 'Καφές χωρίς ζάχαρη.', 'кафЭс хори́с зА́хари.', 'Кофе без сахара.')
  await setExample('για', 'Αυτό είναι για σένα.', 'афтО И́нэ я сЭна.', 'Это для тебя.')
  await setExample('μετά', 'Θα σε δω μετά το μάθημα.', 'та сэ до мэта́ то мА́тима.', 'Увижу тебя после урока.')
  await setExample('πριν', 'Πριν το φαγητό.', 'при́н то фаитО.', 'Перед едой.')
  await setExample('μέχρι', 'Μέχρι αύριο.', 'мэ́хри А́врио.', 'До завтра.')
  await setExample('και', 'Εγώ και εσύ.', 'эго́ кэ эсИ.', 'Я и ты.')
  await setExample('αλλά', 'Θέλω, αλλά δεν μπορώ.', 'тЭло, алла́ дэн боро́.', 'Хочу, но не могу.')
  await setExample('ή', 'Τσάι ή καφές;', 'цАи и́ кафЭс;', 'Чай или кофе?')
  await setExample('ότι', 'Ξέρω ότι είσαι εδώ.', 'ксЭро о́ти И́сэ эдО.', 'Я знаю, что ты здесь.')
  await setExample('αν', 'Αν θέλεις, έλα.', 'ан тЭлис, Эла.', 'Если хочешь, приходи.')
  await setExample('όταν', 'Όταν φτάσω, θα σε πάρω.', 'о́тан фтА́со, та сэ пА́ро.', 'Когда приеду, позвоню тебе.')
  await setExample('επειδή', 'Άργησα επειδή είχε κίνηση.', 'А́ргиса эпи́ди И́хэ кИниси.', 'Я опоздал, потому что была пробка.')
  await setExample('επίσης', 'Καλή όρεξη! – Επίσης!', 'калИ Орэкси! – эпИсис!', 'Приятного аппетита! – И тебе тоже!')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
