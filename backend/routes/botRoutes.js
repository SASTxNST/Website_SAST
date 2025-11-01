import express from "express";
import returnResponse from "../controllers/botController.js";

const botRouter = express.Router();

botRouter.post("/", returnResponse);

export default botRouter;
