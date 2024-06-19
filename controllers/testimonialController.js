import {testimonialModel} from '../model/Testimonial.js'

export const addTestimonial = async(req, res) =>{
    try{
      const testimonial = new testimonialModel({
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
        testimonial: req.body.testimonial,
        rating: req.body.rating,
        des: req.body.des,
        socialMedia: req.body.socialMedia,
        isActive: req.body.isActive
      })
      console.log(testimonial)
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

export const deleteTestimonial = async (req, res) => {
  const id =req.params.id;
  try{
   const testimonial = new testimonialModel.deleteOne(id);
   if (testimonial) {
    return res.status(200).json({ message: "Testimonial deleted successfully." });
  } else {
    return res.status(300).json({ error: "Failed to delete testimonial" });
  }
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}