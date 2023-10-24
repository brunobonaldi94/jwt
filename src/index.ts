import 'dotenv/config';
import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = process.env.JWT_SECRET!;
const token = sign({
  exp: Date.now() + (20 * 60 * 60 * 1000),
  data: {
    id: 1,
    name: 'John Doe',
  },
  secret,
})

verify({
  secret,
  token
})