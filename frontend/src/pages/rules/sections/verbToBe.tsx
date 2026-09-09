import RuleTable from '../RuleTable'
import type { RuleSection } from '../types'

const verbToBe: RuleSection = {
  id: 'verb-to-be',
  title: 'Глагол «быть» (είμαι)',
  content: (
    <>
      <p className="rule-note">Спряжение глагола-связки «είμαι» — «быть» в настоящем времени.</p>
      <RuleTable
        rows={[
          {
            greek: '(Εγώ) είμαι',
            translation: 'я есть',
            example: { greek: 'Εγώ είμαι δάσκαλος.', translation: 'Я учитель.' },
          },
          {
            greek: '(Εσύ) είσαι',
            translation: 'ты есть',
            example: { greek: 'Εσύ είσαι πολύ όμορφη.', translation: 'Ты очень красивая.' },
          },
          {
            greek: '(Αυτός/αυτή/αυτό) είναι',
            translation: 'он/она/оно есть',
            example: { greek: 'Αυτός είναι εδώ, αυτή είναι εκεί.', translation: 'Он здесь, она там.' },
          },
          {
            greek: '(Εμείς) είμαστε',
            translation: 'мы есть',
            example: { greek: 'Εμείς είμαστε φίλοι.', translation: 'Мы друзья.' },
          },
          {
            greek: '(Εσείς) είστε (είσαστε)',
            translation: 'вы есть',
            example: { greek: 'Εσείς είστε από τη Ρωσία;', translation: 'Вы из России?' },
          },
          {
            greek: '(Αυτοί/αυτές/αυτά) είναι',
            translation: 'они есть',
            example: { greek: 'Αυτοί είναι μαθητές.', translation: 'Они ученики.' },
          },
        ]}
      />

      <h3 className="rule-subheading">Полезные слова</h3>
      <RuleTable
        rows={[
          { greek: 'εδώ', translation: 'здесь' },
          { greek: 'εκεί', translation: 'там' },
          { greek: 'καλά', translation: 'хорошо' },
          { greek: 'τώρα', translation: 'сейчас' },
          { greek: 'σήμερα', translation: 'сегодня' },
          { greek: 'πού;', translation: 'где?', example: { greek: 'Πού είσαι τώρα;', translation: 'Где ты сейчас?' } },
          { greek: 'από πού;', translation: 'откуда?', example: { greek: 'Από πού είστε;', translation: 'Откуда вы?' } },
          { greek: 'γιατί;', translation: 'почему?' },
          { greek: 'πότε;', translation: 'когда?' },
          { greek: 'αργά', translation: 'поздно' },
        ]}
      />
    </>
  ),
}

export default verbToBe
