import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').default('3003').asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  USERS_SERVICE_URL: get('USERS_SERVICE_URL').default('http://localhost:3001').asString(),
  PRODUCTS_SERVICE_URL: get('PRODUCTS_SERVICE_URL').default('http://localhost:3002').asString(),
};
