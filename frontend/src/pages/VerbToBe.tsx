import VerbTrainer from './VerbTrainer'

const HINT_ROWS: [string, string][] = [
  ['Εγώ', 'είμαι'],
  ['Εσύ', 'είσαι'],
  ['Αυτός/-ή/-ό', 'είναι'],
  ['Εμείς', 'είμαστε'],
  ['Εσείς', 'είστε'],
  ['Αυτοί/-ές/-ά', 'είναι'],
]

function VerbToBe() {
  return (
    <VerbTrainer
      group={0}
      hintRows={HINT_ROWS}
      hintLabel="Подсказка по спряжению глагола быть"
      backTo="/grammar"
    />
  )
}

export default VerbToBe
