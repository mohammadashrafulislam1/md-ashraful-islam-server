import express from "express";
import { addProject } from "../controllers/projectController.js";

export const projectRouter = express.Router();

projectRouter.post("/", addProject)