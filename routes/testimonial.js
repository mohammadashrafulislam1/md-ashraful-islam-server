import express from "express";
import { upload } from "../middleware/multer.js";
import { addTestimonial } from "../controllers/testimonialController.js";


export const testRouter = express.Router();

testRouter.post('/', upload.single('image'), addTestimonial)