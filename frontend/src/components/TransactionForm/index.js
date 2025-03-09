import { useState } from "react";

export default function TransactionForm({ wallet, handleTransaction }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isCredit, setIsCredit] = useState(true);

  const submitTransaction = () => {
    if (!description.trim()) {
      alert("Description is required.");
      return;
    }
    handleTransaction(amount, description, isCredit);
    setAmount("");
    setDescription("");
  };

  return (
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
        onClick={submitTransaction}
      >
        Submit
      </button>
    </div>
  );
}
