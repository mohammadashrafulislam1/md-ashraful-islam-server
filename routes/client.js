import express from "express";
import { addClient, deleteClient, getClients, getOneClient } from "../controllers/clientController.js";
import { upload } from "../middleware/multer.js";

export const clientRouter = express.Router();

// add client (only work separately)
clientRouter.post('/', upload.single('clientPhoto'), addClient)
// get single client
clientRouter.get('/:id', getOneClient)
// get all clients 
clientRouter.get("/", getClients)
//delete client
clientRouter.delete("/:id", deleteClient)