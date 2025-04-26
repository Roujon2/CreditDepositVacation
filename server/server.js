import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {serverConfig} from './config/serverConfig.js';

// ---- Import Routes ----
import {errorHandler, notFoundHandler} from './src/errors/errorRoutes.js';
import depositRoutes from './src/routes/depositRoutes.js';
import paymentRouter from './src/routes/paymentRoutes.js';


// ---- Main app ----
const app = express();
const PORT = serverConfig.port;


// --- CORS configuration ---
app.use(cors(serverConfig.corsOptions));

// Parsing json bodies
app.use(bodyParser.json());

// General endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});


// ---- App Routes ----
app.use('/api/v1/deposit', depositRoutes);
app.use('/api/v1/payment', paymentRouter);

// ---- Error Handling ----
app.use(notFoundHandler); // Handle 404 errors
app.use(errorHandler);

// ---- Start Server ----
app.listen(PORT, () => {
    console.log(`Server is running on http://${serverConfig.host}:${PORT}`);
});