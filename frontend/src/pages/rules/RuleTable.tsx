export interface RuleTableRow {
  greek: string
  example?: string
}

function RuleTable({ rows }: { rows: RuleTableRow[] }) {
  return (
    <table className="rule-table">
      <tbody>
        {rows.map((row) => (
          <tr className="rule-table-row" key={row.greek}>
            <td>
              <span className="rule-table-greek">{row.greek}</span>
              {row.example && (
                <>
                  {' — '}
                  <span className="rule-table-example">{row.example}</span>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RuleTable
