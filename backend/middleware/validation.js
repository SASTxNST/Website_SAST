/**
 * Validation Middleware for Express Routes
 * Provides input validation and sanitization for API endpoints
 */

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    req.body = value;
    next();
  };
};

const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  
  // Remove potential XSS attempts
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .trim();
};

const validateChatMessage = (req, res, next) => {
  const { msg, history } = req.body;

  // Validate message exists and is a string
  if (!msg || typeof msg !== "string") {
    return res.status(400).json({
      success: false,
      message: "Message is required and must be a string",
    });
  }

  // Validate message length
  if (msg.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Message cannot be empty",
    });
  }

  if (msg.length > 2000) {
    return res.status(400).json({
      success: false,
      message: "Message is too long (max 2000 characters)",
    });
  }

  // Validate history is an array if provided
  if (history !== undefined && !Array.isArray(history)) {
    return res.status(400).json({
      success: false,
      message: "History must be an array",
    });
  }

  // Limit history size to prevent abuse
  if (history && history.length > 50) {
    return res.status(400).json({
      success: false,
      message: "History is too long (max 50 messages)",
    });
  }

  // Sanitize the message
  req.body.msg = sanitizeInput(msg);

  next();
};

const rateLimiter = (windowMs = 60000, maxRequests = 20) => {
  const requests = new Map();

  return (req, res, next) => {
    const identifier = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requests.has(identifier)) {
      requests.set(identifier, []);
    }

    const userRequests = requests.get(identifier);
    
    // Filter out old requests outside the time window
    const recentRequests = userRequests.filter(
      (timestamp) => now - timestamp < windowMs
    );

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
        retryAfter: Math.ceil(windowMs / 1000),
      });
    }

    recentRequests.push(now);
    requests.set(identifier, recentRequests);

    // Cleanup old entries periodically
    if (Math.random() < 0.01) {
      for (const [key, timestamps] of requests.entries()) {
        const valid = timestamps.filter((ts) => now - ts < windowMs);
        if (valid.length === 0) {
          requests.delete(key);
        } else {
          requests.set(key, valid);
        }
      }
    }

    next();
  };
};

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  // Default error response
  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "development" 
      ? err.message 
      : "Internal server error",
  });
};

module.exports = {
  validateRequest,
  validateChatMessage,
  rateLimiter,
  sanitizeInput,
  errorHandler,
};
