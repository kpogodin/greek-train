import { Fragment } from 'react'

export interface RuleTableRow {
  greek: string
  example?: string
}

function RuleTable({ rows }: { rows: RuleTableRow[] }) {
  return (
    <table className="rule-table">
      <tbody>
        {rows.map((row) => (
          <Fragment key={row.greek}>
            <tr className="rule-table-row">
              <td className="rule-table-greek">{row.greek}</td>
            </tr>
            {row.example && (
              <tr className="rule-table-example-row">
                <td className="rule-table-example">{row.example}</td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default RuleTable
