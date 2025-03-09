export default function WalletDetails({ wallet }) {
    if (!wallet) return null;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Wallet Details</h2>
        <p className="text-lg font-semibold">Name: <span className="text-gray-700">{wallet.name}</span></p>
        <p className="text-xl font-bold mt-2">
          Balance: 
          <span className="ml-2 text-green-600">{wallet.balance.toFixed(4)}</span>
        </p>
      </div>
    );
  }
  