import express from "express";
import { addClient } from "../controllers/clientController.js";

export const clientRouter = express.Router();

clientRouter.post('/', addClient)