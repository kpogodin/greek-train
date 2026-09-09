import { Fragment } from 'react'

export interface RuleTableRow {
  greek: string
  translation: string
  example?: {
    greek: string
    translation: string
  }
}

function RuleTable({ rows }: { rows: RuleTableRow[] }) {
  return (
    <table className="rule-table">
      <tbody>
        {rows.map((row) => (
          <Fragment key={row.greek}>
            <tr className="rule-table-row">
              <td className="rule-table-greek">{row.greek}</td>
              <td className="rule-table-translation">{row.translation}</td>
            </tr>
            {row.example && (
              <tr className="rule-table-example-row">
                <td colSpan={2} className="rule-table-example">
                  <span className="rule-table-example-greek">{row.example.greek}</span>
                  {' — '}
                  {row.example.translation}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default RuleTable
