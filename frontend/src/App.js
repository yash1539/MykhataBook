import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import WalletForm from "./components/WalletForm/index";
import { CSVLink } from "react-csv";
import { format } from "date-fns";

export default function WalletApp() {
  const [wallet, setWallet] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isCredit, setIsCredit] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
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
    const response = await axios.post("http://localhost:8080/api/setup", {
      name,
      balance,
    });

    setWallet(response.data);
    localStorage.setItem("walletId", response.data._id);
  };

  const fetchWallet = async (walletId) => {
    if (!walletId) {
      alert("Please create an account");
      return;
    }
    const response = await axios.get(
      `http://localhost:8080/api/wallet/${walletId}`
    );
    setWallet(response.data);
    fetchTransactions(walletId);
  };

  const handleTransaction = async () => {
    if (!wallet) return;
    if (!description.trim()) {
      alert("Description is required.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/transact/${wallet._id}`,
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
      `http://localhost:8080/api/transactions?walletId=${walletId}&skip=0&limit=10`
    );
    setTransactions(response.data);
  };

  const sortTransactions = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig.key === "amount") {
      return sortConfig.direction === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else {
      return sortConfig.direction === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 shadow-xl rounded-lg border border-gray-200">
      <Header />
      {wallet === false ? (
        <WalletForm createWallet={createWallet} />
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-center mt-4 mb-4">
            Wallet: {wallet.name}
          </h2>
          <p className="text-center text-xl font-semibold mb-4">
            Balance:{" "}
            <span className="text-green-600">{wallet.balance.toFixed(4)}</span>
          </p>
          <div className="text-right mb-4">
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
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold mb-2">Make a Transaction</h3>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-3 w-full mb-3 rounded-lg"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-3 w-full mb-3 rounded-lg"
            />
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={isCredit}
                onChange={() => setIsCredit(!isCredit)}
                className="mr-2"
              />
              <span className="text-lg">{isCredit ? "Credit" : "Debit"}</span>
            </div>
            <button
              className="bg-green-600 hover:bg-green-800 text-white p-3 w-full rounded-lg font-semibold"
              onClick={handleTransaction}
            >
              Submit
            </button>
          </div>
          <h2 className="text-2xl font-bold mt-4 text-center">Transactions</h2>
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-200 text-lg text-gray-700">
                  <th className="p-4">Description</th>
                  <th className="p-4">Type</th>
                  <th
                    className="p-4 cursor-pointer"
                    onClick={() => sortTransactions("amount")}
                  >
                    Amount{" "}
                    {sortConfig.key === "amount"
                      ? sortConfig.direction === "asc"
                        ? "☝🏻"
                        : "👇"
                      : ""}
                  </th>
                  <th
                    className="p-4 cursor-pointer"
                    onClick={() => sortTransactions("date")}
                  >
                    Date{" "}
                    {sortConfig.key === "date"
                      ? sortConfig.direction === "asc"
                        ? "☝🏻"
                        : "👇"
                      : ""}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx) => (
                  <tr key={tx._id} className="border-b hover:bg-gray-100">
                    <td className="p-4">{tx.description}</td>
                    <td
                      className={`p-4 font-semibold ${
                        tx.type === "CREDIT" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.type}
                    </td>
                    <td className="p-4">{tx.amount.toFixed(4)}</td>
                    <td className="p-4">{format(new Date(tx.date), "PPpp")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
