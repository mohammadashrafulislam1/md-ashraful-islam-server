import {testimonialModel} from '../model/Testimonial.js'
import { cloudinary } from '../utils/cloudinary.js'

export const addTestimonial = async(req, res) =>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
      const testimonial = new testimonialModel({
        image: imageResult.secure_url,
        name: req.body.name,
        email: req.body.email,
        testimonial: req.body.testimonial,
        rating: req.body.rating,
        des: req.body.des,
        socialMedia: req.body.socialMedia,
        isActive: req.body.isActive
      })
      const insert = await testimonial.save();
      res.status(201).json(insert);
    }
    catch (e){
            // Handle error
            console.error("Error adding client:", e);
            res.status(500).json({ e: "Internal Server Error" });
          }
}
export const getTestimonials = async(req, res)=>{
    try{
     const testimonials = await testimonialModel.find();
     if (testimonials) {
        res.json(testimonials);
      } else {
        res.status(404).json({ message: 'Testimonials not found' });
      }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}