import RuleTable from '../RuleTable'
import type { RuleSection } from '../types'

const verbsA: RuleSection = {
  id: 'verbs-a',
  title: 'Глаголы группы A (Α΄ Συζυγία)',
  content: (
    <>
      <p className="rule-note">
        Окончания глаголов первого спряжения (группа A) в настоящем времени — на примере глагола{' '}
        <strong>γράφω</strong> (писать).
      </p>
      <RuleTable
        rows={[
          { greek: '(Εγώ) γράφ{ω}', example: 'Εγώ γράφω ένα γράμμα.' },
          { greek: '(Εσύ) γράφ{εις}', example: 'Εσύ γράφεις πολύ όμορφα.' },
          { greek: '(Αυτός/-ή/-ό) γράφ{ει}', example: 'Αυτή γράφει στο τετράδιο.' },
          { greek: '(Εμείς) γράφ{ουμε}', example: 'Εμείς γράφουμε μαζί.' },
          { greek: '(Εσείς) γράφ{ετε}', example: 'Εσείς γράφετε αργά.' },
          { greek: '(Αυτοί/-ές/-ά) γράφ{ουν}', example: 'Αυτοί γράφουν γράμματα.' },
        ]}
      />
      <p className="rule-note">
        В 3-м лице множественного числа иногда встречается вариант <strong>-ουνε</strong>:
        γράφουνε.
      </p>
    </>
  ),
}

export default verbsA
