import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

/* export const PORT = process.env.PORT;
export const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL; */

export default {
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGO_CONNECTION_URL,
  },
  crypto: {
    iterations: process.env.NODE_ENV === 'test' ? 1 : 1 /* 12000 */,
    length: 128,
    digest: 'sha512',
  },
};
