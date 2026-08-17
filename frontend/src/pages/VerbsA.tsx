import VerbTrainer from './VerbTrainer'

const HINT_ROWS: [string, string][] = [
  ['Εγώ', '-ω'],
  ['Εσύ', '-εις'],
  ['Αυτός', '-ει'],
  ['Εμείς', '-ουμε'],
  ['Εσείς', '-ετε'],
  ['Αυτοί', '-ουν(ε)'],
]

function VerbsA() {
  return (
    <VerbTrainer
      group={1}
      hintRows={HINT_ROWS}
      hintLabel="Подсказка по спряжению группы A"
      backTo="/grammar"
    />
  )
}

export default VerbsA
