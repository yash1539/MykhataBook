import { useState } from "react";
import { format } from "date-fns";

export default function TransactionList({ transactions }) {
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortTransactions = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig.key === "amount") {
      return sortConfig.direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else {
      return sortConfig.direction === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mt-4 text-center">Transactions</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-200 text-lg text-gray-700">
            <th className="p-4">Description</th>
            <th className="p-4">Type</th>
            <th className="p-4 cursor-pointer" onClick={() => sortTransactions("amount")}>
              Amount {sortConfig.key === "amount" ? (sortConfig.direction === "asc" ? "☝🏻" : "👇") : ""}
            </th>
            <th className="p-4 cursor-pointer" onClick={() => sortTransactions("date")}>
              Date {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? "☝🏻" : "👇") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((tx) => (
            <tr key={tx._id} className="border-b hover:bg-gray-100">
              <td className="p-4">{tx.description}</td>
              <td className={`p-4 font-semibold ${tx.type === "CREDIT" ? "text-green-600" : "text-red-600"}`}>
                {tx.type}
              </td>
              <td className="p-4">{tx.amount.toFixed(4)}</td>
              <td className="p-4">{format(new Date(tx.date), "PPpp")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
