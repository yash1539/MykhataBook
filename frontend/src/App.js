import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import WalletForm from "./components/WalletForm";
import WalletDetails from "./components/WalletDetails";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import { CSVLink } from "react-csv";
import { format } from "date-fns";

export default function WalletApp() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const walletId = localStorage.getItem("walletId");
    if (walletId) fetchWallet(walletId);
  }, []);

  const createWallet = async (name, balance = 0) => {
    if (!name || !balance) {
      alert("Please fill in all details");
      return;
    }
    const response = await axios.post(
      "https://mcq-live-test.onrender.com/api/setup",
      { name, balance }
    );
    setWallet(response.data);
    localStorage.setItem("walletId", response.data._id);
    fetchTransactions(response.data._id);
  };

  const fetchWallet = async (walletId) => {
    if (!walletId) {
      alert("Please create an account");
      return;
    }
    const response = await axios.get(
      `https://mcq-live-test.onrender.com/api/wallet/${walletId}`
    );
    setWallet(response.data);
    fetchTransactions(walletId);
  };

  const handleTransaction = async (amount, description, isCredit) => {
    if (!wallet || !description.trim()) {
      alert("Invalid transaction details");
      return;
    }
    try {
      const response = await axios.post(
        `https://mcq-live-test.onrender.com/api/transact/${wallet._id}`,
        {
          amount: isCredit ? parseFloat(amount) : -parseFloat(amount),
          description,
        }
      );
      setWallet((prev) => ({ ...prev, balance: response.data.balance }));
      fetchTransactions(wallet._id);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  const fetchTransactions = async (walletId) => {
    const response = await axios.get(
      `https://mcq-live-test.onrender.com/api/transactions?walletId=${walletId}&skip=0&limit=10`
    );
    setTransactions(response.data);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 shadow-xl rounded-lg border border-gray-200">
      <Header />
      {wallet ? (
        <>
          <WalletDetails wallet={wallet} transactions={transactions} />
          <TransactionForm handleTransaction={handleTransaction} />
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
        </>
      ) : (
        <WalletForm createWallet={createWallet} />
      )}
    </div>
  );
}
