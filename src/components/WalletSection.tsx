import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Wallet } from "../types/wallet";
import WalletCard from "./WalletCard";
import AddWallet from "./AddWallet";

const WalletSection = () => {
  //   const { userId } = useParams<{ userId: string }>();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await fetch("http://localhost:3001/wallets");
        const wallets = await data.json();
        setWallets(wallets);
      } catch (err) {
        setError("Failed to fetch wallets" + err);
      } finally {
        setLoading(false);
      }
    };

    loadWallets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full h-full p-2">
      <h1 className="text-2xl font-bold mb-4 ml-2">Your Wallets</h1>
      {wallets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallets.map((wallet) => (
            <WalletCard
              walletName={wallet.walletName}
              currentBalance={wallet.currentBalance}
              type={wallet.type}
              setWallets={setWallets}
              key={wallet._id}
            />
          ))}
          <div className="w-full flex items-center justify-center gap-3">
            <h1 className="text-2xl font-semibold">Add Wallet: </h1>
            <AddWallet setWallets={setWallets} />
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen grid place-items-center">
          <div className="flex gap-4">
            <p className="text-2xl font-semibold">No wallets found.</p>
            <AddWallet setWallets={setWallets} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSection;
