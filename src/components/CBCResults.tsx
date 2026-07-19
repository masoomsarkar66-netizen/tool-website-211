type CBCItem = {
  name: string;
  value: string | number;
  status: "Normal" | "High" | "Low" | "Unknown";
};

interface CBCResultsProps {
  results: CBCItem[];
}

export default function CBCResults({
  results,
}: CBCResultsProps) {
  if (!results || results.length === 0) {
    return null;
  }

  const getBadge = (
    status: "Normal" | "High" | "Low" | "Unknown"
  ) => {
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
              <th className="border p-3 text-left">Test</th>
              <th className="border p-3 text-left">Value</th>
              <th className="border p-3 text-left">Status</th>
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

      <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <h3 className="mb-2 font-bold text-blue-800">
          Summary
        </h3>

        <ul className="ml-6 list-disc space-y-2 text-slate-700">
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
