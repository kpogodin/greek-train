import RuleTable from '../RuleTable'
import type { RuleSection } from '../types'

const verbsB1: RuleSection = {
  id: 'verbs-b1',
  title: 'Глаголы группы B1 (Β1΄ Συζυγία)',
  content: (
    <>
      <p className="rule-note">
        Окончания глаголов группы B1 в настоящем времени — на примере глагола{' '}
        <strong>μιλάω</strong> (говорить).
      </p>
      <RuleTable
        rows={[
          { greek: '(Εγώ) μιλ{άω}', example: 'Εγώ μιλάω ελληνικά.' },
          { greek: '(Εσύ) μιλ{άς}', example: 'Εσύ μιλάς πολύ γρήγορα.' },
          { greek: '(Αυτός/-ή/-ό) μιλ{άει}', example: 'Αυτός μιλάει στο τηλέφωνο.' },
          { greek: '(Εμείς) μιλ{άμε}', example: 'Εμείς μιλάμε αγγλικά.' },
          { greek: '(Εσείς) μιλ{άτε}', example: 'Εσείς μιλάτε ρωσικά;' },
          { greek: '(Αυτοί/-ές/-ά) μιλ{άνε}', example: 'Αυτοί μιλάνε συνέχεια.' },
        ]}
      />
      <p className="rule-note">
        В 1-м лице ед. числа и 3-м лице мн. числа встречаются короткие варианты: <strong>μιλώ</strong>,{' '}
        <strong>μιλούν</strong>.
      </p>
    </>
  ),
}

export default verbsB1
