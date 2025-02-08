import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { Wallet } from "@/types/wallet";
import { useState } from "react";

interface WalletCardProps {
  walletName: string;
  currentBalance: number;
  type: string;
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}

export const WalletCard = ({
  walletName,
  currentBalance,
  type,
  setWallets,
}: WalletCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return (
    <Card className="bg-white dark:bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-black text-xl font-semibold">
          {walletName}
        </CardTitle>
        <CardDescription className="text-zinc-600">{type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <p className="text-black text-2xl font-bold">
            ${currentBalance.toLocaleString()}
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size={"icon"}
                className="rounded-full dark:bg-red-950 dark:text-white hover:text-black"
              >
                <RiDeleteBinLine />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-white">Are you sure?</DialogTitle>
              </DialogHeader>
              <p className="text-gray-600">
                Do you really want to delete <strong>{walletName}</strong>? This
                action cannot be undone.
              </p>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="text-white"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setWallets((prev) => {
                      //Send delete wallet request and hide it or send request then refetch.
                      return prev.filter(
                        (wallet) => wallet.walletName != walletName
                      );
                    });
                  }}
                >
                  Yes, Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
