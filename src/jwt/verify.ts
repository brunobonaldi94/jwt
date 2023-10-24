import { generateSignature } from "./generateSignature";

interface IVerifyptions {
  token: string
  secret: string
}

export function verify({token, secret}: IVerifyptions) {
  const [base64EncodedHeader, base64EncodedPayload, signatureEncoded] = token.split('.');

  const signature = generateSignature({base64EncodedHeader, base64EncodedPayload, secret});

  if (signature !== signatureEncoded) {
    console.log('signature', {signature, signatureEncoded});
    throw new Error('Invalid token');
  }
  const decodedPayload = JSON.parse(Buffer.from(base64EncodedPayload, 'base64url').toString('utf-8'));
  if (decodedPayload.exp < Date.now()) {
    throw new Error('Expired token');
  }
  console.log('payload', {decodedPayload});
}


