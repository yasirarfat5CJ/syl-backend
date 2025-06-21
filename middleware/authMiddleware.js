const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // adjust path if needed

const protect = asyncHandler(async (req, res, next) => {
  console.log("Headers:", req.headers); // Log the headers
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
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
