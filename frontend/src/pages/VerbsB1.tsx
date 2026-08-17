import VerbTrainer from './VerbTrainer'

const HINT_ROWS: [string, string][] = [
  ['Εγώ', '-άω'],
  ['Εσύ', '-άς'],
  ['Αυτός', '-άει'],
  ['Εμείς', '-άμε'],
  ['Εσείς', '-άτε'],
  ['Αυτοί', '-άνε'],
]

function VerbsB1() {
  return (
    <VerbTrainer
      group={2}
      hintRows={HINT_ROWS}
      hintLabel="Подсказка по спряжению группы B1"
      backTo="/grammar"
    />
  )
}

export default VerbsB1
