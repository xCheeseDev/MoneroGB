# Monero Game Boy Signer — scaffold

An experimental scaffold for a Monero cold-signing companion inspired by SignGB.
This is **not a working wallet or signer**. It deliberately does not implement
Monero cryptography, transaction serialization, key handling, or broadcasting.

## Architecture

- `web/`: browser UI and camera/QR boundary (future)
- `src/domain/`: typed transaction workflow contracts
- `src/monero/`: adapter boundary for a vetted Monero implementation / wallet RPC
- `src/transport/`: QR or other air-gap transport contracts
- `docs/THREAT_MODEL.md`: security assumptions and decisions
- `docs/MONERO_WORKFLOW.md`: recommended protocol flow

## Why Monero differs

Do not port the Dogecoin UTXO builder or its Base58 text protocol. Monero uses
stealth addresses, ring signatures, RingCT, key images, and Monero-specific
transaction construction. A safe first version should use the established
Monero offline transaction workflow: prepare an unsigned transaction set on an
online/watch-only side, transfer it to an offline wallet for signing, then
return the signed transaction set for validation and relay.

A Game Boy implementation would need a carefully reviewed Monero signing
implementation or a different offline signer device. This scaffold models the
interfaces only.

## Suggested development order

1. Build a desktop prototype around the Monero CLI wallet's documented offline
   signing workflow, on testnet/stagenet first.
2. Implement strict import/export validation and QR/animated-QR transport.
3. Add a review screen that independently displays recipient, amount, fee,
   change, and network before signing.
4. Only then assess whether the Game Boy hardware/firmware can support the
   required cryptography and transaction review.
5. Security review and reproducible test vectors before handling real funds.

## Development

This scaffold is intentionally dependency-free and contains TypeScript
contracts only. Add a TypeScript runner/test framework after choosing the
application target. No seed phrase or private spend key should ever enter the
browser.
