import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TransactionList from "../TransactionList"
import { CSVLink } from "react-csv";
import { format } from "date-fns";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const walletId = localStorage.getItem("walletId");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (walletId) fetchTransactions(walletId);
  }, [walletId]);

  const fetchTransactions = async (walletId) => {
    const response = await axios.get(
      `http://localhost:8080/api/transactions?walletId=${walletId}&skip=0&limit=10`
    );
    setTransactions(response.data);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 mb-4"
      >
        Back to Wallet
      </button>
      <CSVLink
            data={transactions.map((tx) => ({
              Description: tx.description,
              Type: tx.type,
              Amount: tx.amount.toFixed(4),
              Date: format(new Date(tx.date), "PPpp"),
            }))}
            filename="transactions.csv"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            Export CSV
          </CSVLink>
          <TransactionList
            transactions={transactions}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          /> 
    </div>
  );
}
