import RuleTable from '../RuleTable'
import type { RuleSection } from '../types'

const passiveVoice: RuleSection = {
  id: 'passive-voice',
  title: 'Пассивный залог (αποθετικά ρήματα)',
  content: (
    <>
      <p className="rule-callout">
        <strong>Как узнать:</strong> это глаголы, которые стоят только в форме пассивного залога,
        хотя по смыслу активные (спать, приходить, сидеть...). Делятся на два типа по ударению:{' '}
        <strong>κοιμάμαι</strong> — ударение всегда на окончании, <strong>έρχομαι</strong> — ударение
        на основе (кроме «мы» и второго варианта «вы»).
      </p>

      <h3 className="rule-subheading">Тип κοιμάμαι (спать)</h3>
      <RuleTable
        rows={[
          { greek: '(Εγώ) κοιμ{άμαι}', example: 'Εγώ κοιμάμαι νωρίς.' },
          { greek: '(Εσύ) κοιμ{άσαι}', example: 'Εσύ κοιμάσαι πολύ.' },
          { greek: '(Αυτός/-ή/-ό) κοιμ{άται}', example: 'Αυτή κοιμάται τώρα.' },
          { greek: '(Εμείς) κοιμ{όμαστε}', example: 'Εμείς κοιμόμαστε αργά.' },
          { greek: '(Εσείς) κοιμ{άστε} / κοιμ{όσαστε}', example: 'Εσείς κοιμάστε καλά;' },
          { greek: '(Αυτοί/-ές/-ά) κοιμ{ούνται}', example: 'Αυτοί κοιμούνται όλη μέρα.' },
        ]}
      />
      <p className="rule-note">
        Так же спрягаются: <strong>φοβάμαι</strong> (бояться), <strong>λυπάμαι</strong> (жалеть,
        сожалеть), <strong>θυμάμαι</strong> (помнить).
      </p>

      <h3 className="rule-subheading">Тип έρχομαι (приходить)</h3>
      <RuleTable
        rows={[
          { greek: '(Εγώ) έρχ{ομαι}', example: 'Εγώ έρχομαι αύριο.' },
          { greek: '(Εσύ) έρχ{εσαι}', example: 'Εσύ έρχεσαι μαζί μας;' },
          { greek: '(Αυτός/-ή/-ό) έρχ{εται}', example: 'Αυτός έρχεται τώρα.' },
          { greek: '(Εμείς) ερχ{όμαστε}', example: 'Εμείς ερχόμαστε αργά.' },
          { greek: '(Εσείς) έρχ{εστε} / ερχ{όσαστε}', example: 'Εσείς έρχεστε στο πάρτι;' },
          { greek: '(Αυτοί/-ές/-ά) έρχ{ονται}', example: 'Αυτοί έρχονται από την Αθήνα.' },
        ]}
      />
      <p className="rule-note">
        Так же спрягаются: <strong>γίνομαι</strong> (становиться, происходить),{' '}
        <strong>κάθομαι</strong> (сидеть), <strong>βρίσκομαι</strong> (находиться).
      </p>
    </>
  ),
}

export default passiveVoice
