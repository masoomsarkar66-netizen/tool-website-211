type CBCItem = {
  name: string;
  value: string | number;
  status: "Normal" | "High" | "Low" | "Unknown";
};

interface CBCResultsProps {
  results: CBCItem[];
}

export default function CBCResults({ results }: CBCResultsProps) {
  if (!results || results.length === 0) {
    return null;
  }

  const getBadge = (status: string) => {
    switch (status) {
      case "Normal":
        return (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
            🟢 Normal
          </span>
        );

      case "High":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
            🔴 High
          </span>
        );

      case "Low":
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">
            🟡 Low
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm">
            ⚪ Unknown
          </span>
        );
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        CBC Analysis Results
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="text-left p-3 border">Test</th>
              <th className="text-left p-3 border">Value</th>
              <th className="text-left p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {results.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50 transition"
              >
                <td className="border p-3 font-medium">
                  {item.name}
                </td>

                <td className="border p-3">
                  {item.value}
                </td>

                <td className="border p-3">
                  {getBadge(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-2">
          Summary
        </h3>

        <ul className="list-disc ml-6 text-slate-700 space-y-2">
          {results.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> is{" "}
              <strong>{item.status}</strong>.
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm text-slate-500">
          This CBC analysis is for educational purposes only and
          should not replace professional medical advice.
        </p>
      </div>
    </div>
  );
}
