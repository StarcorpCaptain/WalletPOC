import { Balance, Transaction } from "wallet/types/wallet";
import { ApiBalance, ApiTransaction } from "..";

export interface Mapper {
  responseToBalance: (input: ApiBalance) => Balance;
  responseToTransactions: (input: ApiTransaction) => Transaction[];
}
