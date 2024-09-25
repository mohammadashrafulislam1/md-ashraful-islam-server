import express from "express";
import { upload } from "../middleware/multer.js";
import { addTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from "../controllers/testimonialController.js";


export const testRouter = express.Router();

testRouter.post('/', addTestimonial)
testRouter.get('/', getTestimonials)
testRouter.put('/:id', updateTestimonial)
testRouter.delete('/:id', deleteTestimonial)