import type {
  SignedTransactionBundle,
  TransactionSummary,
  UnsignedTransactionBundle,
} from "../domain/types";
import type { MoneroAdapter } from "../monero/MoneroAdapter";

/**
 * Minimal orchestration skeleton. UI must present the inspected summary and
 * obtain explicit human approval before calling signOffline.
 */
export class SigningWorkflow {
  constructor(private readonly monero: MoneroAdapter) {}

  async inspect(
    unsigned: UnsignedTransactionBundle,
  ): Promise<TransactionSummary> {
    return this.monero.inspectUnsigned(unsigned);
  }

  async signAfterApproval(
    unsigned: UnsignedTransactionBundle,
    reviewedSummary: TransactionSummary,
    userApproved: boolean,
  ): Promise<SignedTransactionBundle> {
    if (!userApproved) throw new Error("Signing cancelled: user did not approve.");

    const current = await this.monero.inspectUnsigned(unsigned);
    if (!sameSummary(current, reviewedSummary)) {
      throw new Error("Transaction summary changed. Review the transaction again.");
    }

    return this.monero.signOffline(unsigned, reviewedSummary);
  }
}

function sameSummary(a: TransactionSummary, b: TransactionSummary): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
