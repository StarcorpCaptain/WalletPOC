import { ApiBalance, ApiBroadcastTransaction, ApiFees, ApiTransaction, ApiTransactionCount } from './types';

export interface Fetcher {
  fetchBalance: (address: string) => Promise<ApiBalance>;
  fetchTransactions: (address: string, query: URLSearchParams) => Promise<ApiTransaction>;
  fetchFees: (chain: string, type: string, fromUTXO: any[], to: any[]) => Promise<ApiFees>;
  sendBroadcastTransaction: (txData: string) => Promise<ApiBroadcastTransaction>;
  sendRawTransaction?: (transaction: string) => Promise<ApiBroadcastTransaction>;
  fetchTransactionCount?: (address: string) => Promise<ApiTransactionCount>;
}
