import RuleArrowRow from '../RuleArrowRow'
import RuleTable from '../RuleTable'
import type { RuleSection } from '../types'

const regularVerbStemChanges: RuleSection = {
  id: 'regular-verb-stem-changes',
  title: 'Правильные глаголы: как меняются буквы (αόριστος/να)',
  content: (
    <>
      <p className="rule-note">
        У правильных глаголов основа для <strong>να</strong> (и будущего времени <strong>θα</strong>)
        меняется не случайно, а по правилу — последняя согласная (или сочетание букв) основы
        превращается в одну и ту же букву перед добавлением -σ-.
      </p>

      <h3 className="rule-subheading">π, β, φ → ψ</h3>
      <RuleArrowRow variant="pattern" items={[{ from: '{π/β/φ}', to: '{ψ}' }]} />
      <RuleArrowRow
        items={[
          { from: 'γρά{φ}ω', to: 'να γρά{ψω}' },
          { from: 'κό{β}ω', to: 'να κό{ψω}' },
          { from: 'κρύ{β}ω', to: 'να κρύ{ψω}' },
          { from: 'κλέ{β}ω', to: 'να κλέ{ψω}' },
        ]}
      />

      <h3 className="rule-subheading">κ, γ, χ → ξ</h3>
      <RuleArrowRow variant="pattern" items={[{ from: '{κ/γ/χ}', to: '{ξ}' }]} />
      <RuleArrowRow
        items={[
          { from: 'ανοί{γ}ω', to: 'να ανοί{ξω}' },
          { from: 'πλέ{κ}ω', to: 'να πλέ{ξω}' },
          { from: 'τρέ{χ}ω', to: 'να τρέ{ξω}' },
        ]}
      />

      <h3 className="rule-subheading">ζ → σ</h3>
      <RuleArrowRow variant="pattern" items={[{ from: '{ζ}', to: '{σ}' }]} />
      <RuleArrowRow
        items={[
          { from: 'αγορά{ζ}ω', to: 'να αγορά{σω}' },
          { from: 'καθαρί{ζ}ω', to: 'να καθαρί{σω}' },
          { from: 'γνωρί{ζ}ω', to: 'να γνωρί{σω}' },
        ]}
      />

      <h3 className="rule-subheading">-εύω → -έψω</h3>
      <RuleArrowRow variant="pattern" items={[{ from: '-{εύω}', to: '-{έψω}' }]} />
      <RuleArrowRow
        items={[
          { from: 'χορ{εύω}', to: 'να χορ{έψω}' },
          { from: 'δουλ{εύω}', to: 'να δουλ{έψω}' },
          { from: 'ταξιδ{εύω}', to: 'να ταξιδ{έψω}' },
        ]}
      />

      <h3 className="rule-subheading">гласная + ν(ω) → σ (ν пропадает)</h3>
      <RuleArrowRow variant="pattern" items={[{ from: '{νω}', to: '{σω}' }]} />
      <RuleArrowRow
        items={[
          { from: 'τελειώ{νω}', to: 'να τελειώ{σω}' },
          { from: 'μεγαλώ{νω}', to: 'να μεγαλώ{σω}' },
          { from: 'χά{νω}', to: 'να χά{σω}' },
          { from: 'σηκώ{νω}', to: 'να σηκώ{σω}' },
        ]}
      />

      <p className="rule-note">
        Дальше глагол спрягается как обычно: -ω, -εις, -ει, -ουμε, -ετε, -ουν. Пример на глаголе{' '}
        <strong>γράφω</strong> → <strong>γράψω</strong>.
      </p>
      <RuleTable
        rows={[
          { greek: '(Εγώ) να γράψ{ω}' },
          { greek: '(Εσύ) να γράψ{εις}' },
          { greek: '(Αυτός/-ή/-ό) να γράψ{ει}' },
          { greek: '(Εμείς) να γράψ{ουμε}' },
          { greek: '(Εσείς) να γράψ{ετε}' },
          { greek: '(Αυτοί/-ές/-ά) να γράψ{ουν}' },
        ]}
      />
    </>
  ),
}

export default regularVerbStemChanges
