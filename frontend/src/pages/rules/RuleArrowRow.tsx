import { renderHighlighted } from './highlight'

export interface RuleArrowItem {
  from: string
  to: string
}

interface RuleArrowRowProps {
  items: RuleArrowItem[]
  variant?: 'pattern' | 'example'
}

function RuleArrowRow({ items, variant = 'example' }: RuleArrowRowProps) {
  return (
    <div className={`rule-arrow-list rule-arrow-list-${variant}`}>
      {items.map((item) => (
        <div className="rule-arrow-row" key={item.from}>
          <span>{renderHighlighted(item.from)}</span>
          <span className="rule-arrow-symbol">→</span>
          <span>{renderHighlighted(item.to)}</span>
        </div>
      ))}
    </div>
  )
}

export default RuleArrowRow
