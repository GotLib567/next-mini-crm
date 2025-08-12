const Table = ({ columns = [], rows = [], renderRow }) => (
  <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
    <table className="w-full text-sm">
      <thead className="bg-neutral-50 dark:bg-neutral-900/50">
      <tr>
        {columns.map((c, i) => (
          <th key={i} className={`px-4 py-3 text-left font-medium text-neutral-600 dark:text-neutral-300 ${c.className || ""}`}>{c.title}</th>
        ))}
      </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
      {rows.map((r, i) => (
        <tr key={i} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/60 transition-colors">{renderRow(r)}</tr>
      ))}
      </tbody>
    </table>
  </div>
);

export default Table;