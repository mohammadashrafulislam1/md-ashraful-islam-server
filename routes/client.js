import express from "express";
import { addClient, getOneClient } from "../controllers/clientController.js";

export const clientRouter = express.Router();

clientRouter.post('/', addClient)

clientRouter.get('/:id', getOneClient)