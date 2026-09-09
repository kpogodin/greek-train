import { Fragment, type ReactNode } from 'react'

/**
 * Renders text with `{...}` segments wrapped in a highlighted span —
 * used to call out word endings, e.g. "άνθρωπ{ος}".
 */
export function renderHighlighted(text: string): ReactNode {
  const parts = text.split(/(\{[^}]+\})/g)
  return parts.map((part, i) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      return (
        <span className="rule-ending" key={i}>
          {part.slice(1, -1)}
        </span>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
