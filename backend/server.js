/**
 * Citi-Serve Backend Server
 * Production-ready Express.js server with security headers, rate limiting,
 * compression, logging, and centralized error handling.
 */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const lawRoutes = require('./routes/lawRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const translateRoutes = require('./routes/translateRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ─── SECURITY MIDDLEWARE ────────────────────────────────
// Set secure HTTP headers
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Rate limiting — prevent brute-force and DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,                  // max 200 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again after 15 minutes.' }
});
app.use('/api/', apiLimiter);

// ─── PERFORMANCE MIDDLEWARE ─────────────────────────────
// Gzip compression for all responses
app.use(compression());

// ─── PARSING & CORS ─────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── LOGGING ────────────────────────────────────────────
// HTTP request logger (use 'combined' in production, 'dev' in development)
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// ─── STATIC FILES ───────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── API ROUTES ─────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/laws', lawRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/translate', translateRoutes);

// ─── HEALTH CHECK ───────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Citi-Serve API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ─── 404 HANDLER ────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ─── GLOBAL ERROR HANDLER ───────────────────────────────
app.use(errorHandler);

// ─── START SERVER ───────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Citi-Serve server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
