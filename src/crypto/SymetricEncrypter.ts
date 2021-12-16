export interface SymmetricEncrypter {
  /**
   * Given plaintext to encrypt, and additional authenticated data, creates corresponding ciphertext and
   * provides the corresponding initialization vector, key, and tag. Note, not all
   * @param plaintext Data to be symmetrically encrypted
   * @param additionalAuthenticatedData Data that will be integrity checked but not encrypted
   * @returns An object containing the corresponding ciphertext, initializationVector, key, and tag
   */
  encrypt (plaintext: Buffer, additionalAuthenticatedData: Buffer): Promise<{
    /** Ciphertext */
    ciphertext: Buffer,
    /** Initialization Vector */
    initializationVector: Buffer,
    /** Content Encryption Key */
    key: Buffer,
    /** Authentication Tag */
    tag: Buffer}>;

  /**
   * Given the ciphertext, additional authenticated data, initialization vector, key, and tag,
   * decrypts the ciphertext.
   * @param ciphertext Data to be decrypted
   * @param additionalAuthenticatedData Integrity checked data
   * @param initializationVector Initialization vector
   * @param key Symmetric key
   * @param tag Authentication tag
   * @returns the plaintext of ciphertext
   */
  decrypt (ciphertext: Buffer, additionalAuthenticatedData: Buffer, initializationVector: Buffer, key: Buffer, tag: Buffer): Promise<Buffer>;
}