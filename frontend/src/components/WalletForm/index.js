import { useState } from "react";

const WalletForm=({ createWallet })=> {
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
  
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Create Wallet</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-full mb-3 rounded-lg"
        />
        <input
          type="number"
          placeholder="Initial Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white p-3 w-full rounded-lg font-semibold"
          onClick={() => createWallet(name, parseFloat(balance) || 0)}
        >
          Create Wallet
        </button>
      </div>
    );
  }
  export default WalletForm;