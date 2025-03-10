import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import WalletForm from "./components/WalletForm";
import WalletDetails from "./components/WalletDetails";
import TransactionForm from "./components/TransactionForm";
import TransactionsPage from "./components/TansactionPage";

export default function WalletApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WalletHome />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </Router>
  );
}

function WalletHome() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const walletId = localStorage.getItem("walletId");
    if (walletId) fetchWallet(walletId);
  }, []);

  const createWallet = async (name, balance) => {
    if (balance === "" || isNaN(balance) || balance < 0) {
      alert("Please enter correct balance");
      return;
    }
    
    const response = await axios.post("http://localhost:8080/api/setup", { name, balance });
    setWallet(response.data);
    localStorage.setItem("walletId", response.data.id);
    fetchTransactions(response.data.id);
  };

  const fetchWallet = async (walletId) => {
    if (!walletId) {
      alert("Please create an account");
      return;
    }
    const response = await axios.get(`http://localhost:8080/api/wallet/${walletId}`);
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
        `http://localhost:8080/api/transact/${wallet.id}`,
        {
          amount: isCredit ? parseFloat(amount) : -parseFloat(amount),
          description,
        }
      );
      setWallet((prev) => ({ ...prev, balance: response.data.balance }));
      fetchTransactions(wallet.id);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  const fetchTransactions = async (walletId) => {
    const response = await axios.get(
      `http://localhost:8080/api/transactions?walletId=${walletId}&skip=0&limit=10`
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
          <button
            onClick={() => navigate("/transactions")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 mt-4"
          >
            View Transactions
          </button>
        </>
      ) : (
        <WalletForm createWallet={createWallet} />
      )}
    </div>
  );
}