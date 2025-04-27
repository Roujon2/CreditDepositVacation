import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { serverConfig } from './config/serverConfig';

// ---- Import Routes ----
import { errorHandler, notFoundHandler } from './errors/errorRoutes';
import depositRoutes from './routes/depositRoutes';
import paymentRouter from './routes/paymentRoutes';


// ---- Main app ----
const app = express();

// --- CORS configuration ---
app.use(cors(serverConfig.corsOptions));

// Parsing JSON bodies
app.use(bodyParser.json());

// General endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API!');
});

// ---- App Routes ----
app.use('/api/v1/deposit', depositRoutes);
app.use('/api/v1/payment', paymentRouter);

// ---- Error Handling ----
app.use(notFoundHandler); // Handle 404 errors
app.use(errorHandler); // Handle all other errors

// ---- Export the app ----
export default app;
