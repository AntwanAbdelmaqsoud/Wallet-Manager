export type Wallet = {
  _id: string;
  walletName: string;
  currentBalance: number;
  type: string;
  userId: string;
};

export type WalletPost = {
  id: string;
  walletName: string;
  currentBalance: number;
  type: string;
  userId: string;
};
