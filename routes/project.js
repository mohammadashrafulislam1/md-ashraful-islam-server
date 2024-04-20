import express from "express";
import { addProject, deleteProject, getProjects, updateProjectController } from "../controllers/projectController.js";
import { upload } from "../middleware/multer.js";
export const projectRouter = express.Router();

// add project router
projectRouter.post("/", upload.fields([
  { name: 'galleryImages', maxCount: 5 }
]), addProject);
// get project router
projectRouter.get("/", getProjects)
// delete project router
projectRouter.delete("/:id", deleteProject)
// update project router
projectRouter.put("/:id", updateProjectController)