import express from "express";
import { addProject } from "../controllers/projectController.js";
import { upload } from "../middleware/multer.js";
export const projectRouter = express.Router();

projectRouter.post("/", upload.single('projectImage'), addProject);
  
