import { projectModel } from "../Model/projects.js";
import { clientModel } from "../model/Clients.js";

export const addProject = async (req, res) => {
  try {
    // Check for required fields
    // if (!req.body.title || !req.body.description) {
    //   return res.status(400).json({ error: "Required fields are missing." });
    // }

    let clientInfoId = null;

    // Create a new project instance using the uploaded image URLs from ImageBB
    const newProject = new projectModel({
      title: req.body.title,
      description: req.body.description,
      projectCategory: req.body.projectCategory,
      projectUrl: req.body.projectUrl,
      githubUrl: req.body.githubUrl,
      technologies: req.body.technologies,
      duration: req.body.duration,
      challenges: req.body.challenges,
      userName: req.body.userName || "Md Ashraful Islam",
      userEmail: req.body.userEmail || "mohammadashrafulislam33@gmail.com",
      projectImage: req.uploadedImages.projectImage,
      mobileImage: req.uploadedImages.mobileImage,
      tabletImage: req.uploadedImages.tabletImage,
      // Assuming galleryImages is handled differently
      galleryImages: [], 
      clientInfo: clientInfoId || null,
      isFeatured: req.body.isFeatured,
    });

    // Save the new project to the database
    const savedProject = await newProject.save();

    // Respond with the saved project data
    res.status(201).json(savedProject);
  } catch (error) {
    // Handle error
    console.error("Error adding project:", error);
    return res.status(500).send("Internal Server Error");
  }
};
