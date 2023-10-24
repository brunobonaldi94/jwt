import { createHmac } from 'node:crypto';

interface IGenerateSignatureOptions {
  secret: string, 
  base64EncodedHeader: string, 
  base64EncodedPayload: string
}
export function generateSignature({base64EncodedHeader, base64EncodedPayload, secret}: IGenerateSignatureOptions) {
  const signature = createHmac('sha256', secret)
  .update(`${base64EncodedHeader}.${base64EncodedPayload}`)
  .digest('base64url');

  return signature;
}