# Threat model and non-negotiable rules

- Secret recovery phrase and private spend keys remain offline and never enter
  browser JavaScript, analytics, logs, clipboard helpers, or network requests.
- Treat all QR codes, imported files, RPC responses, and text payloads as
  untrusted input.
- Parse and validate using vetted Monero code; do not write cryptographic
  primitives from scratch.
- Before approval, independently display network, recipient, amount, fee, and
  change. Reject ambiguous or unsupported transactions.
- Bind transaction data to the selected network and protocol version.
- Never broadcast an unsigned transaction or assume a QR checksum proves
  authenticity.
- Test with disposable testnet/stagenet funds. This scaffold is not audited
  and must not be used with real funds.
