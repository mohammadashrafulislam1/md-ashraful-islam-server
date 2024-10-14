import express from "express";
import { addProject, deleteProject, getOneProject, getProjects, updateProjectController } from "../controllers/projectController.js";
import { upload } from "../middleware/multer.js";

export const projectRouter = express.Router();

// add project router
projectRouter.post("/", upload.fields([
  { name: 'galleryImages', maxCount: 20 }
]), addProject);
// get projects router
projectRouter.get("/", getProjects)
// get One Project router
projectRouter.get("/:title", getOneProject)
// delete project router
projectRouter.delete("/:id", deleteProject)
// update project router
projectRouter.put("/:id", upload.fields([
  { name: 'galleryImages', maxCount: 5 }
]), updateProjectController)
