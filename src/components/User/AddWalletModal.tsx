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
import { WalletPost } from "@/types/wallet";

const AddWalletModal = ({ disable }: { disable: boolean }) => {
  const queryClient = useQueryClient();
  const { user, accessToken } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<WalletPost>({
    id: crypto.randomUUID(),
    walletName: "",
    currentBalance: 0,
    type: "cash",
    userId: user!._id,
  });

  const addWallet = async (data: WalletPost) => {
    const response = await fetch(
      "https://wallet-manager-api-production.up.railway.app/wallets",
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
      throw new Error("Failed to add wallet");
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: () => addWallet(formData),
    onSuccess: () => {
      setFormData({
        ...formData,
        walletName: "",
        currentBalance: 0,
        type: "cash",
      }); // Reset form
      queryClient.invalidateQueries({ queryKey: ["wallets", user?._id] });
    },
    onError: (error) => {
      console.error("Error adding wallet:", error.message);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);
    mutation.mutate();
    setOpen(false);
  };

  return (
    <div>
      <Button disabled={disable} onClick={() => setOpen(true)}>
        Add Wallet
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle>Add a New Wallet</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="walletName">Wallet Name</Label>
                <Input
                  id="walletName"
                  name="walletName"
                  value={formData.walletName}
                  onChange={handleChange}
                  placeholder="Enter wallet name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentBalance">Current Balance</Label>
                <Input
                  id="currentBalance"
                  name="currentBalance"
                  type="number"
                  value={formData.currentBalance}
                  onChange={handleChangeNumber}
                  placeholder="Enter current balance"
                  required
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="hover:bg-zinc-700" value="cash">
                      Cash
                    </SelectItem>
                    <SelectItem className="hover:bg-zinc-700" value="bank">
                      Bank
                    </SelectItem>
                    <SelectItem className="hover:bg-zinc-700" value="crypto">
                      Crypto
                    </SelectItem>
                    <SelectItem className="hover:bg-zinc-700" value="e_wallet">
                      E-Wallet
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-4 gap-3">
              <Button disabled={mutation.isPending} type="submit">
                {mutation.isPending ? "Adding..." : "Add Wallet"}
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

export default AddWalletModal;
