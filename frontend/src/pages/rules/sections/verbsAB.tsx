import RuleTable from '../RuleTable'
import type { RuleSection } from '../types'

const verbsAB: RuleSection = {
  id: 'verbs-ab',
  title: 'Смешанные глаголы (τύπου ΑΒ)',
  content: (
    <>
      <p className="rule-callout">
        <strong>Как узнать:</strong> короткие «неправильные» глаголы на -ω, у которых часть окончаний
        как в группе A, а часть — как в группе B1. Их нужно просто запомнить. Самые частые:{' '}
        <strong>τρώω</strong> (есть), <strong>λέω</strong> (говорить), <strong>πάω</strong> (идти),{' '}
        <strong>ακούω</strong> (слышать).
      </p>
      <p className="rule-note">
        Спряжение на примере глагола <strong>τρώω</strong> (есть).
      </p>
      <RuleTable
        rows={[
          { greek: '(Εγώ) τρ{ώω}', example: 'Εγώ τρώω πρωινό.' },
          { greek: '(Εσύ) τρ{ως}', example: 'Εσύ τρως πολύ αργά.' },
          { greek: '(Αυτός/-ή/-ό) τρ{ώει}', example: 'Αυτή τρώει σαλάτα.' },
          { greek: '(Εμείς) τρ{ώμε}', example: 'Εμείς τρώμε μαζί.' },
          { greek: '(Εσείς) τρ{ώτε}', example: 'Εσείς τρώτε τώρα;' },
          { greek: '(Αυτοί/-ές/-ά) τρ{ώνε}', example: 'Αυτοί τρώνε έξω.' },
        ]}
      />
    </>
  ),
}

export default verbsAB
