import RuleArrowRow from '../RuleArrowRow'
import type { RuleSection } from '../types'

const plural: RuleSection = {
  id: 'plural',
  title: 'Множественное число',
  content: (
    <>
      <p className="rule-note">
        Во множественном числе меняется и артикль, и окончание существительного: единственное число →
        множественное число.
      </p>

      <h3 className="rule-subheading">Мужской род</h3>
      <RuleArrowRow
        variant="pattern"
        items={[
          { from: '-{ος}', to: '-{οι}' },
          { from: '-{ης}', to: '-{ες}' },
          { from: '-{ας}', to: '-{ες}' },
        ]}
      />
      <RuleArrowRow
        items={[
          { from: '[ο] άνθρωπ{ος}', to: '[οι] άνθρωπ{οι}' },
          { from: '[ο] μαθητ{ής}', to: '[οι] μαθητ{ές}' },
          { from: '[ο] άντρ{ας}', to: '[οι] άντρ{ες}' },
        ]}
      />

      <h3 className="rule-subheading">Женский род</h3>
      <RuleArrowRow
        variant="pattern"
        items={[
          { from: '-{α}', to: '-{ες}' },
          { from: '-{η}', to: '-{ες}' },
        ]}
      />
      <RuleArrowRow
        items={[
          { from: '[η] γυναίκ{α}', to: '[οι] γυναίκ{ες}' },
          { from: '[η] αδερφ{ή}', to: '[οι] αδερφ{ές}' },
        ]}
      />

      <h3 className="rule-subheading">Средний род</h3>
      <RuleArrowRow
        variant="pattern"
        items={[
          { from: '-{ο}', to: '-{α}' },
          { from: '-{ι}', to: '-{ια}' },
          { from: '-{μα}', to: '-{ματα}' },
        ]}
      />
      <RuleArrowRow
        items={[
          { from: '[το] βιβλί{ο}', to: '[τα] βιβλί{α}' },
          { from: '[το] παιδ{ί}', to: '[τα] παιδ{ιά}' },
          { from: '[το] όνο{μα}', to: '[τα] ονό{ματα}' },
        ]}
      />
    </>
  ),
}

export default plural
