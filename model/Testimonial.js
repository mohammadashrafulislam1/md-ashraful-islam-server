import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    image: {type: String},
    name:{type: String},
    email:{type:String},
    testimonial:{type : String},
    rating:{type: Number},
    des: {type: String},
    socialMedia: {type: String},
    isActive:{type: Boolean, default: true},
    created_at:{type: Date, default: Date.now}
})

export const testimonialModel = mongoose.model("testimonials", testimonialSchema);