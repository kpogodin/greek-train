import RuleArrowRow from '../RuleArrowRow'
import type { RuleSection } from '../types'

const accusativeSingular: RuleSection = {
  id: 'accusative-singular',
  title: 'Винительный падеж (единственное число)',
  content: (
    <>
      <p className="rule-note">
        В винительном падеже всегда меняется артикль, а у мужского рода — ещё и окончание
        существительного: именительный падеж → винительный падеж.
      </p>

      <h3 className="rule-subheading">Мужской род</h3>
      <RuleArrowRow
        variant="pattern"
        items={[
          { from: '[ο]', to: '[τον]' },
          { from: '-{ος}', to: '-{ο}' },
          { from: '-{ης}', to: '-{η}' },
          { from: '-{ας}', to: '-{α}' },
        ]}
      />
      <RuleArrowRow
        items={[
          { from: '[ο] άνθρωπ{ος}', to: '[τον] άνθρωπ{ο}' },
          { from: '[ο] μαθητ{ής}', to: '[τον] μαθητ{ή}' },
          { from: '[ο] άντρ{ας}', to: '[τον] άντρ{α}' },
        ]}
      />

      <h3 className="rule-subheading">Женский род</h3>
      <p className="rule-note">Окончание существительного не меняется — только артикль.</p>
      <RuleArrowRow variant="pattern" items={[{ from: '[η]', to: '[τη(ν)]' }]} />
      <p className="rule-note">
        (ν добавляется перед словом, которое начинается с гласной — иначе используется τη)
      </p>
      <RuleArrowRow
        items={[
          { from: '[η] γυναίκα', to: '[τη] γυναίκα' },
          { from: '[η] αδερφή', to: '[την] αδερφή' },
        ]}
      />

      <h3 className="rule-subheading">Средний род</h3>
      <p className="rule-note">Не меняется ни артикль, ни окончание.</p>
      <RuleArrowRow
        items={[
          { from: '[το] βιβλίο', to: '[το] βιβλίο' },
          { from: '[το] παιδί', to: '[το] παιδί' },
        ]}
      />
    </>
  ),
}

export default accusativeSingular
