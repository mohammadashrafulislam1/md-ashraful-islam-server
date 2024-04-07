import { projectModel } from "../Model/projects.js";
import { clientModel } from "../model/Clients.js"; // Import the client model
import { cloudinary } from "../utils/Cloudinary.js";
import { upload } from "../middleware/multer.js";

export const addProject = async (req, res) => {
  try {
    // Check for required fields
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    let clientInfoId = null;

       // Upload projectImage to Cloudinary
    const imageUploadResult = await cloudinary.uploader.upload(req.file.path);

    // Get the URL of the uploaded image from Cloudinary
    const imageUrl = imageUploadResult.secure_url;

    // Create a new project instance
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
      projectImage: imageUrl,
      galleryImages: imageUrl,
      clientInfo: clientInfoId || null, // Assign the ObjectId of the existing or newly created client
      isFeatured: req.body.isFeatured,
      mobileImage: imageUrl,
      tabletImage: imageUrl
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
