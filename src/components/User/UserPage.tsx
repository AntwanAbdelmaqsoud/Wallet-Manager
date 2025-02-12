import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "../ui/button";
import AddWalletModal from "./AddWalletModal";
import { FaTrash } from "react-icons/fa";
import { Wallet } from "@/types/wallet";
import { TransactionResponse } from "@/types/transaction";

export default function UserPage() {
  const queryClient = useQueryClient();
  const { user, accessToken } = useContext(AuthContext);

  //fetch wallets
  const { data: walletsData } = useQuery({
    queryKey: ["wallets", user?._id],
    queryFn: async () => {
      const walletsResponse = await fetch(
        "https://wallet-manager-api-production.up.railway.app/wallets",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (walletsResponse.status == 404)
        return {
          data: {
            wallets: [],
          },
        };
      return await walletsResponse.json();
    },
  });

  //delete wallet
  const deleteWalletMutation = useMutation({
    mutationFn: async (walletId: string) => {
      const response = await fetch(
        `https://wallet-manager-api-production.up.railway.app/wallets/${walletId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete wallet");
      }
      return response.json();
    },
    onSuccess: () => {
      // Refetch wallets after successful deletion
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  const transactionsQueries = useQueries({
    queries:
      walletsData?.data.wallets?.map((wallet: Wallet) => ({
        queryKey: ["transactions", wallet._id],
        queryFn: async (): Promise<TransactionResponse> => {
          const response = await fetch(
            `https://wallet-manager-api-production.up.railway.app/wallets/${wallet._id}/transactions`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 404) {
            return { data: { transactions: [] } };
          }
          if (!response.ok) {
            throw new Error("Failed to fetch transactions");
          }
          return response.json();
        },
        enabled: !!wallet._id && !!accessToken,
      })) || [],
  }) as {
    data: TransactionResponse;
    isPending: boolean;
    isError: boolean;
  }[];

  const transactions = {
    data: transactionsQueries
      .filter((query) => query.data)
      .flatMap((query) => query.data.data.transactions),
    isPending: transactionsQueries.some((query) => query.isPending),
    isError: transactionsQueries.some((query) => query.isError),
  };

  const getBGClassByWalletType = (type: string) => {
    if (type == "credit") return "from-zinc-900 to-zinc-800/95";
    else if (type == "cash") return "from-green-900 to-green-800/95";
    else if (type == "e_wallet") return "from-red-900 to-red-800/95";
    else if (type == "bank") return "from-blue-900 to-blue-800/95";
    else return "from-pink-900 to-pink-800/95";
  };
  return (
    <div className="min-h-screen w-full flex flex-col p-2 gap-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="w-full bg-gray-200/50 p-3 flex justify-between items-center">
        <h1 className="text-lg rounded font-semibold">Total Balance</h1>
        {walletsData ? (
          <div className="text-xl">
            <span className="font-bold ">
              {walletsData.data.wallets.reduce(
                (sum: number, wallet: Wallet) => (sum += wallet.currentBalance),
                0
              )}{" "}
            </span>
            $
          </div>
        ) : (
          <div className="w-[130px] h-[20px] animate-pulse bg-gray-500 rounded"></div>
        )}
      </div>
      <div className="w-full bg-gray-200 p-3 rounded">
        <div className="flex w-full items-center justify-between mb-3">
          <h1 className="text-lg rounded font-semibold">Wallets</h1>
          <AddWalletModal disable={deleteWalletMutation.isPending} />
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {walletsData ? (
            walletsData.data.wallets.length > 0 ? (
              walletsData.data.wallets.map((wallet: Wallet) => (
                <div
                  className={`bg-gradient-to-br ${getBGClassByWalletType(
                    wallet.type
                  )}  text-white py-2 px-3 rounded-lg flex flex-col`}
                >
                  <h1 className="font-bold text-lg mb-0.5">
                    {wallet.walletName}
                  </h1>
                  <h2 className="font-medium text-gray-400/80 text-lg mb-4">
                    {wallet.type}
                  </h2>
                  <div className="flex items-center w-full justify-between">
                    <p className="font-extralight">
                      Current Balance:{"  "}
                      <span className="font-semibold">
                        {wallet.currentBalance}{" "}
                      </span>
                      $
                    </p>
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      disabled={deleteWalletMutation.isPending}
                      onClick={() => {
                        deleteWalletMutation.mutate(wallet._id);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className=" text-xl">No Wallets :(</div>
            )
          ) : (
            Array(4).fill(
              <div className="py-2 px-3 h-[130px] rounded-lg animate-pulse bg-gray-500"></div>
            )
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 p-3 rounded">
        <div className="flex w-full items-center justify-between mb-3">
          <h1 className="text-lg rounded font-semibold">Transactions</h1>
          {walletsData && walletsData.data.wallets.length > 0 && (
            <Button>Make Transaction</Button>
          )}
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {transactions.data ? (
            transactions.data.length > 0 ? (
              transactions.data.map((transaction) => (
                <div className="shadow flex items-center p-2 justify-between bg-white rounded text-[1.05rem]">
                  <p className="font-medium">{transaction.category}</p>
                  <p
                    className={` font-semibold
                      ${
                        transaction.type == "debit"
                          ? " text-red-600"
                          : " text-green-600"
                      } `}
                  >
                    {transaction.type == "debit" && "-"}
                    {transaction.amount}$
                  </p>
                </div>
              ))
            ) : (
              <div className=" text-xl">No Transactions yet</div>
            )
          ) : (
            Array(4).fill(
              <div className="h-[30px] animate-pulse bg-gray-500 rounded"></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
