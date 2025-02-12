import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AuthContext } from "../Auth/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  categoryType,
  TransactionPost,
  transactionType,
} from "@/types/transaction";
import { Wallet } from "@/types/wallet";

const MakeTransactionModal = ({ wallets }: { wallets: Wallet[] }) => {
  const queryClient = useQueryClient();
  const { user, accessToken } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [transactionFormData, setTransactionFormData] =
    useState<TransactionPost>({
      id: crypto.randomUUID(),
      walletId: "",
      userId: user!._id,
      type: transactionType.debit,
      category: categoryType.food,
      amount: 0,
    });

  const addTransaction = async (data: TransactionPost) => {
    const response = await fetch(
      "https://wallet-manager-api-production.up.railway.app/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to make transaction");
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: () => addTransaction(transactionFormData),
    onSuccess: () => {
      setTransactionFormData({
        ...transactionFormData,
        walletId: "",
        amount: 0,
      }); // Reset form
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets", user?._id] });
    },
    onError: (error) => {
      console.error("Error making transaction:", error.message);
    },
  });

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransactionFormData({ ...transactionFormData, [name]: Number(value) });
  };

  const handleTypeChange = (value: transactionType) => {
    setTransactionFormData({ ...transactionFormData, type: value });
  };
  const handleCategoryChange = (value: categoryType) => {
    setTransactionFormData({ ...transactionFormData, category: value });
  };
  const handleWalletChange = (value: string) => {
    setTransactionFormData({ ...transactionFormData, walletId: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", transactionFormData);
    mutation.mutate();
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Make Transaction</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          aria-describedby="Dialog For making a transaction"
          className="text-white"
        >
          <DialogHeader>
            <DialogTitle>Make a Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={transactionFormData.amount}
                  onChange={handleChangeNumber}
                  placeholder="Enter Amount"
                  required
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={transactionFormData.type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="hover:bg-zinc-700"
                      value={transactionType.credit}
                    >
                      Credit
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-zinc-700"
                      value={transactionType.debit}
                    >
                      Debit
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={transactionFormData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(categoryType).map((cat) => {
                      return (
                        <SelectItem
                          key={crypto.randomUUID()}
                          className="hover:bg-zinc-700"
                          value={cat}
                        >
                          {cat}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Wallet</Label>
                <Select
                  value={transactionFormData.walletId}
                  onValueChange={handleWalletChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets.map((wallet) => {
                      return (
                        <SelectItem
                          key={crypto.randomUUID()}
                          className="hover:bg-zinc-700"
                          value={wallet._id}
                        >
                          {wallet.walletName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-4 gap-3">
              <Button disabled={mutation.isPending} type="submit">
                {mutation.isPending ? "Adding..." : "Make Transaction"}
              </Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              {mutation.isError && (
                <p className="text-red-500">Error: {mutation.error?.message}</p>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MakeTransactionModal;
