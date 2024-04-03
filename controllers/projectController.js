import { projectModel } from "../Model/projects.js";
import { clientModel } from "../model/Clients.js"; // Import the client model

export const addProject = async (req, res) => {
  try {
    // Check for required fields
    if (!req.body.title || !req.body.description || !req.body.projectImage) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    let clientInfoId = null;

    // Check if a client with the provided userName and userEmail exists
    const existingClient = await clientModel.findOne({
      userName: req.body.clientInfo.userName,
      userEmail: req.body.clientInfo.userEmail
    });

    if (existingClient) {
      // If the client already exists, use its ObjectId
      clientInfoId = existingClient._id;
    } else {
      // Create a new client instance
      const newClient = new clientModel({
        userName: req.body.clientInfo.userName,
        userEmail: req.body.clientInfo.userEmail,
        userSocialMedia: req.body.clientInfo.userSocialMedia
      });

      // Save the new client to the database
      const clientResult = await newClient.save();

      // Use the ObjectId of the newly created client
      clientInfoId = clientResult._id;
    }

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
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      projectImage: req.body.projectImage,
      galleryImages: req.body.galleryImages,
      clientInfo: clientInfoId, // Assign the ObjectId of the existing or newly created client
      isFeatured: req.body.isFeatured,
      mobileImage: req.body.mobileImage,
      tabletImage: req.body.tabletImage
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
