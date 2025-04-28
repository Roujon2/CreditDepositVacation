import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const requiredEnvVars = [
    'SERVER_PORT',
    'SERVER_HOST',
    'NODE_ENV',
    'CORS_ORIGIN',
    'STRIPE_API_SECRET_KEY',
    'STRIPE_API_PUBLIC_KEY',
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
] as const;


// Check if all required environment variables are set
requiredEnvVars.forEach((envVar) => {
    if(!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

// ---- Server configuration ----
export const serverConfig = {
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost',
    env: process.env.NODE_ENV || 'development',
    corsOptions: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
};

// ---- Stripe configuration ----
export const stripeConfig = {
    secretKey: process.env.STRIPE_API_SECRET_KEY,
    publicKey: process.env.STRIPE_API_PUBLIC_KEY,
} as const;

// ---- Database configuration ----
export const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database',
} as const;
