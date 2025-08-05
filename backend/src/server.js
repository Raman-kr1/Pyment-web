import fs from 'node:fs';
import https from 'node:https';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

await connectDB();

const app = express();

// Stripe needs raw body for webhooks BEFORE express.json()
app.use('/api/webhooks', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(hpp());
app.use(mongoSanitize());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);

// Error middleware
app.use(errorHandler);

// TLS certificates (self-signed for dev)
const key = fs.readFileSync('./certificates/key.pem');
const cert = fs.readFileSync('./certificates/cert.pem');
https.createServer({ key, cert, minVersion: 'TLSv1.2' }, app)
  .listen(process.env.PORT || 5000, () =>
    console.log(`HTTPS server running on port ${process.env.PORT || 5000}`)
  );