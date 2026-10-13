# Proposed Monero workflow

1. Online/watch-only wallet prepares a transaction and exports Monero's
   unsigned transaction set using the supported wallet tooling.
2. Transfer the export to the offline signer using a defined transport
   (file transfer for the desktop prototype; QR only if payload size and
   error correction are practical).
3. Offline signer parses the data with a vetted Monero implementation.
4. Signer shows a human-readable summary: network, recipient address, amount,
   fee, change, and any relevant warnings. User explicitly approves.
5. Offline wallet signs and exports the signed transaction set.
6. Online side imports the signed set, validates it with Monero wallet tooling,
   and relays it to the network.
7. Display the resulting transaction ID and relay status.

Never invent a custom transaction format when Monero's supported transaction
set formats and wallet APIs can be used. Confirm exact commands and file
formats against the Monero version being targeted.
