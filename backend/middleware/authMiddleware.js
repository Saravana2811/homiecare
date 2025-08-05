const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token and protect routes
const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ 
      errors: [{ msg: 'No token, authorization denied' }] 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user in database
    const user = await User.findById(decoded.user.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        errors: [{ msg: 'Invalid token, user not found' }] 
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ 
      errors: [{ msg: 'Token is not valid' }] 
    });
  }
};

// Middleware to check if user is admin
const adminMiddleware = async (req, res, next) => {
  // First verify regular auth
  authMiddleware(req, res, () => {
    // Check if user is admin
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ 
        errors: [{ msg: 'Admin access required' }] 
      });
    }
  });
};

// Middleware to check if email is verified
const verifiedEmailMiddleware = async (req, res, next) => {
  // First verify regular auth
  authMiddleware(req, res, () => {
    // Check if email is verified
    if (req.user && req.user.isVerified) {
      next();
    } else {
      res.status(403).json({ 
        errors: [{ msg: 'Please verify your email first' }] 
      });
    }
  });
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  verifiedEmailMiddleware
};