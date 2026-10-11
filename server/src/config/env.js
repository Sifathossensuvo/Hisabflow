import 'dotenv/config';
import dns from 'node:dns';
if (process.env.DNS_SERVERS !== 'off') {
  dns.setServers((process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1').split(',').map((s) => s.trim()));
}
const isProd = process.env.NODE_ENV === 'production';

if (isProd && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
  throw new Error('JWT_SECRET must be set to a random string of 32+ characters in production.');
}

export const env = {
  isProd,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hisabflow',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-do-not-use-in-production',
  jwtExpires: process.env.JWT_EXPIRES_IN || '7d',
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()),
  allowPlanSwitch: process.env.ALLOW_PLAN_SWITCH === 'true' || (!isProd && process.env.ALLOW_PLAN_SWITCH !== 'false'),
  aiProvider: process.env.AI_PROVIDER || 'rules',
  llmApiKey: process.env.LLM_API_KEY || '',
};
