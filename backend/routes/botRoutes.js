const express = require("express");
const returnResponse = require("../controllers/botController");
const { validateChatMessage, rateLimiter } = require("../middleware/validation");

const botRouter = express.Router();

// Apply rate limiting and validation middleware
botRouter.post("/", rateLimiter(60000, 20), validateChatMessage, returnResponse);

module.exports = botRouter;
