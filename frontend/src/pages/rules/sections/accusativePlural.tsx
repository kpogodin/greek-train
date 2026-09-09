import RuleArrowRow from '../RuleArrowRow'
import type { RuleSection } from '../types'

const accusativePlural: RuleSection = {
  id: 'accusative-plural',
  title: 'Винительный падеж (множественное число)',
  content: (
    <>
      <p className="rule-note">
        Во множественном числе винительный падеж — это в основном смена артикля; окончание
        существительного меняется только у мужского рода на -ος.
      </p>

      <h3 className="rule-subheading">Мужской род</h3>
      <RuleArrowRow
        variant="pattern"
        items={[
          { from: '[οι]', to: '[τους]' },
          { from: '-{οι}', to: '-{ους}' },
        ]}
      />
      <p className="rule-note">Слова на -ης и -ας окончание не меняют — только артикль.</p>
      <RuleArrowRow
        items={[
          { from: '[οι] άνθρωπ{οι}', to: '[τους] ανθρώπ{ους}' },
          { from: '[οι] μαθητ{ές}', to: '[τους] μαθητ{ές}' },
          { from: '[οι] άντρ{ες}', to: '[τους] άντρ{ες}' },
        ]}
      />

      <h3 className="rule-subheading">Женский род</h3>
      <p className="rule-note">Окончание существительного не меняется — только артикль.</p>
      <RuleArrowRow variant="pattern" items={[{ from: '[οι]', to: '[τις]' }]} />
      <RuleArrowRow
        items={[
          { from: '[οι] γυναίκ{ες}', to: '[τις] γυναίκ{ες}' },
          { from: '[οι] αδερφ{ές}', to: '[τις] αδερφ{ές}' },
        ]}
      />

      <h3 className="rule-subheading">Средний род</h3>
      <p className="rule-note">Не меняется ни артикль, ни окончание.</p>
      <RuleArrowRow
        items={[
          { from: '[τα] βιβλί{α}', to: '[τα] βιβλί{α}' },
          { from: '[τα] παιδ{ιά}', to: '[τα] παιδ{ιά}' },
        ]}
      />
    </>
  ),
}

export default accusativePlural
