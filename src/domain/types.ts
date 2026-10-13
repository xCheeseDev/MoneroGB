export type MoneroNetwork = "mainnet" | "stagenet" | "testnet";

export interface TransactionSummary {
  network: MoneroNetwork;
  recipients: Array<{
    address: string;
    amountAtomic: string; // decimal string; never JS floating point
  }>;
  feeAtomic: string;
  changeAtomic?: string;
  transactionId?: string;
}

export interface UnsignedTransactionBundle {
  format: "monero-unsigned-txset";
  network: MoneroNetwork;
  payloadBase64: string;
}

export interface SignedTransactionBundle {
  format: "monero-signed-txset";
  network: MoneroNetwork;
  payloadBase64: string;
}

export type WorkflowState =
  | { step: "idle" }
  | { step: "unsigned-imported"; summary: TransactionSummary }
  | { step: "awaiting-approval"; summary: TransactionSummary }
  | { step: "signed-export-ready"; summary: TransactionSummary }
  | { step: "error"; message: string };
