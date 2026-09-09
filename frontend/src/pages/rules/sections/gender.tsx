import RuleTable from '../RuleTable'
import type { RuleSection } from '../types'

const gender: RuleSection = {
  id: 'gender',
  title: 'Род существительных (ο / η / το)',
  content: (
    <>
      <p className="rule-note">
        У каждого существительного есть род, который виден по артиклю: <strong>ο</strong> — мужской,{' '}
        <strong>η</strong> — женский, <strong>το</strong> — средний. Род обычно также угадывается по
        окончанию слова.
      </p>

      <h3 className="rule-subheading">Мужской род (ο) — обычно -ος, -ης, -ας</h3>
      <RuleTable
        rows={[
          { greek: 'ο άνθρωπ{ος}', example: 'человек' },
          { greek: 'ο μαθητ{ής}', example: 'ученик' },
          { greek: 'ο άντρ{ας}', example: 'мужчина' },
        ]}
      />

      <h3 className="rule-subheading">Женский род (η) — обычно -α, -η</h3>
      <RuleTable
        rows={[
          { greek: 'η γυναίκ{α}', example: 'женщина' },
          { greek: 'η αδερφ{ή}', example: 'сестра' },
        ]}
      />

      <h3 className="rule-subheading">Средний род (το) — обычно -ο, -ι, -μα</h3>
      <RuleTable
        rows={[
          { greek: 'το βιβλί{ο}', example: 'книга' },
          { greek: 'το παιδ{ί}', example: 'ребёнок' },
          { greek: 'το όνο{μα}', example: 'имя' },
        ]}
      />
    </>
  ),
}

export default gender
