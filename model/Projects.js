import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectCategory: { type: String },
    projectUrl: { type: String },
    githubUrl: { type: String },
    githubUrlServer: { type: String },
    technologies: [String],
    duration: { type: String },
    challenges: { type: String },
    userName: { type: String },
    userEmail: { type: String },
    projectImage: { type: String },
    galleryImages: [String],
    clientInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'clients'
    },
    testimonial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testimonials'
    },
    isFeatured: { type: Boolean, default: false },
    mobileImage: { type: String },
    tabletImage: { type: String }
  });

export const projectModel = mongoose.model("projects", projectSchema);