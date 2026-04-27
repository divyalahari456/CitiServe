/**
 * Auth Routes - Registration, Login, and Profile endpoints.
 * Includes express-validator rules for input sanitization.
 */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @route POST /api/auth/register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    body('role').optional().isIn(['citizen', 'admin']).withMessage('Role must be citizen or admin.')
  ],
  registerUser
);

// @route POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.')
  ],
  loginUser
);

// @route GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;
