import express from "express";
import { addClient, getClients, getOneClient } from "../controllers/clientController.js";

export const clientRouter = express.Router();
// add client (only work separately)
clientRouter.post('/', addClient)
// get single client
clientRouter.get('/:id', getOneClient)
// get all clients 
clientRouter.get("/", getClients)