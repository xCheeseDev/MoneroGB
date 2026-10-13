import type {
  MoneroNetwork,
  SignedTransactionBundle,
  TransactionSummary,
  UnsignedTransactionBundle,
} from "../domain/types";

/**
 * Adapter boundary only. Implement with a vetted Monero wallet/cryptography
 * implementation and documented transaction-set formats. Do not implement
 * Monero cryptography in this interface layer.
 */
export interface MoneroAdapter {
  inspectUnsigned(
    bundle: UnsignedTransactionBundle,
  ): Promise<TransactionSummary>;

  signOffline(
    bundle: UnsignedTransactionBundle,
    approvedSummary: TransactionSummary,
  ): Promise<SignedTransactionBundle>;

  inspectSigned(
    bundle: SignedTransactionBundle,
  ): Promise<TransactionSummary>;

  relaySigned(
    bundle: SignedTransactionBundle,
    network: MoneroNetwork,
  ): Promise<{ transactionId: string }>;
}
