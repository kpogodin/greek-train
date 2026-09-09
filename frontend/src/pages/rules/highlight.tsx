import { Fragment, type ReactNode } from 'react'

/**
 * Renders text with `{...}` and `[...]` segments wrapped in highlighted
 * spans — `{ending}` for word endings, `[article]` for articles, e.g.
 * "[ο] άνθρωπ{ος}".
 */
export function renderHighlighted(text: string): ReactNode {
  const parts = text.split(/(\{[^}]+\}|\[[^\]]+\])/g)
  return parts.map((part, i) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      return (
        <span className="rule-ending" key={i}>
          {part.slice(1, -1)}
        </span>
      )
    }
    if (part.startsWith('[') && part.endsWith(']')) {
      return (
        <span className="rule-article" key={i}>
          {part.slice(1, -1)}
        </span>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
