import express from "express";
import { upload } from "../middleware/multer";
import { addTestimonial } from "../controllers/testimonialController";


export const testRouter = express.Router();

testRouter.post('/', upload.single('image'), addTestimonial)