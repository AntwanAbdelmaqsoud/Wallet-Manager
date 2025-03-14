export enum transactionType {
  credit = "credit",
  debit = "debit",
}

export enum categoryType {
  salary = "Salary",
  freelance = "Freelance",
  gift = "Gift",
  refund = "Refund",
  food = "Food",
  shopping = "Shopping",
  entertainment = "Entertainment",
  education = "Education",
  investment = "Investment",
  investmentReturns = "Investment Returns",
  donations = "Donations",
  other = "Other",
}

export type Transaction = {
  _id: string;
  walletId: string;
  userId: string;
  type: transactionType;
  category: categoryType;
  amount: number;
};

export type TransactionResponse = {
  data: {
    transactions: Transaction[];
  };
};

export type TransactionPost = {
  id: string;
  walletId: string;
  userId: string;
  type: transactionType;
  category: categoryType;
  amount: number;
};
