import { useNavigate } from 'react-router-dom'
import RuleArrowRow from './rules/RuleArrowRow'
import RuleTable from './rules/RuleTable'

function IrregularVerbs() {
  const navigate = useNavigate()

  return (
    <div className="rules-page">
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <h1 className="rules-heading">Неправильные глаголы</h1>

      <div className="standalone-content">
        <p className="rule-note">
          После <strong>να</strong> (а также <strong>θα</strong> и в повелительном наклонении) глагол
          стоит в особой форме — «совершенный вид» (аорист). У многих глаголов основа в этой форме
          отличается от обычной и её нужно просто запомнить.
        </p>

        <h3 className="rule-subheading">Основа не меняется</h3>
        <RuleArrowRow
          items={[
            { from: 'έχω', to: 'να {έχω}' },
            { from: 'κάνω', to: 'να {κάνω}' },
            { from: 'ξέρω', to: 'να {ξέρω}' },
            { from: 'περιμένω', to: 'να {περιμένω}' },
            { from: 'είμαι', to: 'να {είμαι}' },
          ]}
        />

        <h3 className="rule-subheading">
          Основа меняется, окончания обычные (-ω, -εις, -ει, -ουμε, -ειτε, -ουν(ε))
        </h3>
        <RuleArrowRow
          items={[
            { from: 'βάζω', to: 'να {βάλω}' },
            { from: 'βγάζω', to: 'να {βγάλω}' },
            { from: 'δίνω', to: 'να {δώσω}' },
            { from: 'έρχομαι', to: 'να {έρθω}' },
            { from: 'καταλαβαίνω', to: 'να {καταλάβω}' },
            { from: 'μαθαίνω', to: 'να {μάθω}' },
            { from: 'παίρνω', to: 'να {πάρω}' },
            { from: 'πλένω', to: 'να {πλύνω}' },
            { from: 'στέλνω', to: 'να {στείλω}' },
            { from: 'φέρνω', to: 'να {φέρω}' },
            { from: 'φεύγω', to: 'να {φύγω}' },
            { from: 'βγαίνω', to: 'να {βγω}' },
            { from: 'βλέπω', to: 'να {δω}' },
            { from: 'βρίσκω', to: 'να {βρω}' },
            { from: 'λέω', to: 'να {πω}' },
            { from: 'μπαίνω', to: 'να {μπω}' },
            { from: 'πίνω', to: 'να {πιω}' },
          ]}
        />

        <p className="rule-callout">
          <strong>Особые случаи — учить целиком:</strong> <strong>πηγαίνω</strong> (идти) →{' '}
          <strong>να πάω</strong> и <strong>τρώω</strong> (есть) → <strong>να φάω</strong>. Тут меняется
          не только основа, но и сами окончания — они спрягаются не как остальные глаголы в этом
          списке.
        </p>

        <h3 className="rule-subheading">Полное спряжение: πάω / φάω (особый тип)</h3>
        <RuleTable
          rows={[
            { greek: '(Εγώ) να (μη) π{άω}' },
            { greek: '(Εσύ) να (μη) π{ας}' },
            { greek: '(Αυτός/-ή/-ό) να (μη) π{άει}' },
            { greek: '(Εμείς) να (μη) π{άμε}' },
            { greek: '(Εσείς) να (μη) π{άτε}' },
            { greek: '(Αυτοί/-ές/-ά) να (μη) π{άνε}' },
          ]}
        />
        <p className="rule-note">
          <strong>φάω</strong> спрягается точно так же: φάω, φας, φάει, φάμε, φάτε, φάνε.
        </p>

        <h3 className="rule-subheading">Полное спряжение: обычный тип окончаний</h3>
        <p className="rule-note">
          На примере <strong>πληρώνω</strong> (платить) → <strong>πληρώσω</strong>.
        </p>
        <RuleTable
          rows={[
            { greek: '(Εγώ) να (μην) πληρώσ{ω}' },
            { greek: '(Εσύ) να (μην) πληρώσ{εις}' },
            { greek: '(Αυτός/-ή/-ό) να (μην) πληρώσ{ει}' },
            { greek: '(Εμείς) να (μην) πληρώσ{ουμε}' },
            { greek: '(Εσείς) να (μην) πληρώσ{ετε}' },
            { greek: '(Αυτοί/-ές/-ά) να (μην) πληρώσ{ουν}' },
          ]}
        />
        <p className="rule-note">
          На примере короткой основы <strong>βγαίνω</strong> (выходить) → <strong>βγω</strong>.
        </p>
        <RuleTable
          rows={[
            { greek: '(Εγώ) να (μη) βγ{ω}' },
            { greek: '(Εσύ) να (μη) βγ{εις}' },
            { greek: '(Αυτός/-ή/-ό) να (μη) βγ{ει}' },
            { greek: '(Εμείς) να (μη) βγ{ούμε}' },
            { greek: '(Εσείς) να (μη) βγ{είτε}' },
            { greek: '(Αυτοί/-ές/-ά) να (μη) βγ{ούν(ε)}' },
          ]}
        />
      </div>
    </div>
  )
}

export default IrregularVerbs
