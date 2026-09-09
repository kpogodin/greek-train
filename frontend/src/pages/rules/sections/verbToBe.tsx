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
          { greek: '(Εγώ) είμαι', example: 'Εγώ είμαι δάσκαλος.' },
          { greek: '(Εσύ) είσαι', example: 'Εσύ είσαι πολύ όμορφη.' },
          { greek: '(Αυτός/αυτή/αυτό) είναι', example: 'Αυτός είναι εδώ, αυτή είναι εκεί.' },
          { greek: '(Εμείς) είμαστε', example: 'Εμείς είμαστε φίλοι.' },
          { greek: '(Εσείς) είστε (είσαστε)', example: 'Εσείς είστε από τη Ρωσία;' },
          { greek: '(Αυτοί/αυτές/αυτά) είναι', example: 'Αυτοί είναι μαθητές.' },
        ]}
      />
    </>
  ),
}

export default verbToBe
