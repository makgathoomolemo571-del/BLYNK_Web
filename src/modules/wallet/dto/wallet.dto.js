export const WalletDTO = (wallet = {}) => ({
  id: wallet.id,
  userId: wallet.userId,
  balance: Number(wallet.balance ?? 0),
  currency: wallet.currency || "ZAR",
  status: wallet.status,
  totalDeposits: Number(wallet.totalDeposits ?? 0),
  totalWithdrawals: Number(wallet.totalWithdrawals ?? 0),
  totalRevenue: Number(wallet.totalRevenue ?? 0),
  createdAt: wallet.createdAt,
});

export const TransactionDTO = (transaction = {}) => ({
  id: transaction.id,
  type: transaction.type,
  amount: Number(transaction.amount ?? 0),
  currency: transaction.currency || "ZAR",
  status: transaction.status,
  reference: transaction.reference,
  description: transaction.description,
  createdAt: transaction.createdAt,
});

export const WalletResponseDTO = (response = {}) => ({
  wallet: response.wallet
    ? WalletDTO(response.wallet)
    : null,

  transaction: response.transaction
    ? TransactionDTO(response.transaction)
    : null,
});