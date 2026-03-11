const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Avoid DB hit on every request; token already carries id + role.
      req.user = {
        id: decoded.id,
        role: decoded.role
      };
      return next(); // ✅ move to next middleware if success
    } catch (error) {
      console.error('Invalid token:', error.message);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});



// Middleware to restrict access based on user role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    next(); // User has the correct role, proceed with the request
  };
};

// Middleware to allow only admin access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    res.status(403);
    throw new Error('Admin access only');
  }
};




module.exports = {
  protect,
  adminOnly,
  authorizeRoles,
};
