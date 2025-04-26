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
];


// Check if all required environment variables are set
requiredEnvVars.forEach((envVar) => {
    if(!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

// ---- Server configuration ----
const serverConfig = {
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
const stripeConfig = {
    secretKey: process.env.STRIPE_API_SECRET_KEY,
    publicKey: process.env.STRIPE_API_PUBLIC_KEY,
};


// ---- Export configurations ----
export { serverConfig, stripeConfig };