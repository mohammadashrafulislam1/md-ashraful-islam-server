import express from "express";
import { addProject } from "../controllers/projectController.js";
import { upload } from "../middleware/multer.js";

export const projectRouter = express.Router();

projectRouter.post("/", upload.fields([
    { name: 'galleryImages', maxCount: 5 },
    { name: 'projectImage', maxCount: 1 },
    { name: 'mobileImage', maxCount: 1 },
    { name: 'tabletImage', maxCount: 1 }
  ]), addProject)