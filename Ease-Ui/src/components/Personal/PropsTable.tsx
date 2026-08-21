interface PropsTableProps {
  data: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
}

export default function PropsTable({ data }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border-color)]">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="bg-[var(--bg-card)]">
            <th className="px-4 py-3 text-left text-sm font-semibold">Prop</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Default</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.prop} className="border-t border-[var(--border-color)] hover:bg-[var(--bg-card)]">
              <td className="px-4 py-3 text-sm font-mono text-indigo-600 dark:text-indigo-400">{row.prop}</td>
              <td className="px-4 py-3 text-sm font-mono">{row.type}</td>
              <td className="px-4 py-3 text-sm font-mono">{row.default}</td>
              <td className="px-4 py-3 text-sm">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
