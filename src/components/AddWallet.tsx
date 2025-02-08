import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Wallet } from "@/types/wallet";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useParams } from "react-router-dom";

export default function AddWallet({
  setWallets,
}: {
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}) {
  const [isAddDialogOpen, setisAddDialogOpen] = useState<boolean>(false);
  const [walletName, setwalletName] = useState<string>("");
  const [walletType, setwalletType] = useState<string>("");
  const [walletBalance, setwalletBalance] = useState<number>(0);
  const { userId } = useParams<{ userId: string }>();

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setisAddDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full dark:bg-lime-400 dark:text-white hover:text-black"
        >
          <IoAdd />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">Add wallet?</DialogTitle>
        </DialogHeader>
        <div className="text-zinc-200 space-y-3">
          <div>
            <Label htmlFor="name">Wallet Name</Label>
            <Input
              id="name"
              type="text"
              value={walletName}
              onChange={(e) => setwalletName(e.target.value)}
              placeholder="Enter the wallet name"
            />
          </div>
          <div>
            <Label htmlFor="type">Wallet type</Label>
            <Input
              id="type"
              type="text"
              value={walletType}
              onChange={(e) => setwalletType(e.target.value)}
              placeholder="Enter the wallet type"
            />
          </div>
          <div>
            <Label htmlFor="balance">Wallet Balance</Label>
            <Input
              id="balance"
              type="number"
              value={walletBalance}
              onChange={(e) => setwalletBalance(Number(e.target.value))}
              placeholder="Enter the wallet balance"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="text-white"
            onClick={() => setisAddDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-lime-400 dark:bg-lime-500 hover:dark:bg-lime-600"
            variant="destructive"
            onClick={() => {
              setWallets((prev) => {
                //Send delete wallet request and hide it or send request then refetch.
                const newWallet: Wallet = {
                  currentBalance: walletBalance,
                  type: walletType,
                  walletName: walletName,
                  _id: (Math.random() * 50).toString(),
                  userId: userId!,
                };
                return [...prev, newWallet];
              });
            }}
          >
            Yes, Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
