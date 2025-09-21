import crypto from 'node:crypto'

export const generateReferralCode = (length = 8)  => {
  return crypto.randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, length)
    .toUpperCase();
}