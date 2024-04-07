import express from "express";
import { addProject } from "../controllers/projectController.js";
import { upload } from "../middleware/multer.js";

export const projectRouter = express.Router();

projectRouter.post("/", upload.array('galleryImages', 5), upload.single('projectImage'), upload.single('mobileImage'), upload.single('tabletImage'), addProject);
