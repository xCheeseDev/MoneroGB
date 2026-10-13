/**
 * Transport is separate from transaction parsing. QR decoding is not proof
 * that a payload is valid or authentic; callers must validate after import.
 */
export interface AirgapTransport {
  encode(payload: Uint8Array): Promise<string[]>;

  decode(frames: string[]): Promise<Uint8Array>;
}

export interface ImportLimits {
  maxBytes: number;
  maxFrames: number;
}

export const DEFAULT_IMPORT_LIMITS: ImportLimits = {
  maxBytes: 2_000_000,
  maxFrames: 2_000,
};
