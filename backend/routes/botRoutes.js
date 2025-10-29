const express = require("express");
const returnResponse = require("../controllers/botController");
const botRouter = express.Router();
botRouter.post("/", returnResponse);
module.exports = botRouter;
