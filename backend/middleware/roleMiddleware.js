/**
 * Role Middleware - Restricts access based on user roles.
 * Must be used AFTER authMiddleware (protect) so req.user is available.
 * 
 * Usage: router.get('/admin-only', protect, authorize('admin'), handler)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' is not authorized for this resource.`
      });
    }

    next();
  };
};

module.exports = { authorize };
