import { projectModel } from "../Model/projects.js";
import { clientModel } from "../model/Clients.js";
import { cloudinary } from "../utils/Cloudinary.js";

export const addProject = async (req, res) => {
  try {// Check for required fields
    if (!req.body.title || !req.body.description || !req.body.projectImage) {
      return res.status(400).json({ error: "Required fields are missing." });
    }
    // Check if a client with the provided userName and userEmail exists
    const existingClient = await clientModel.findOne({
      userEmail: req.body.clientInfo.userEmail
    });

    let clientInfoId = null;

    if (existingClient) {
      // If the client already exists, use its ObjectId
      clientInfoId = existingClient._id;
    } else {
      // Create a new client instance
      const newClient = new clientModel({
        userName: req.body.clientName || "",
        userEmail: req.body.clientEmail ||"",
        userSocialMedia: req.body.clientSocialMedia ||""
      });

      // Save the new client to the database
      const clientResult = await newClient.save();

      // Use the ObjectId of the newly created client
      clientInfoId = clientResult._id;
    }
    // check if project already exist or not
    const existingProject = await projectModel.findOne({
      title: req.body.title
    })
    if(existingProject){
      return res.status(400).json({ error: "Project already exists." });
    }
    else{
      

    const galleryImages = req.files['galleryImages'];

    // Upload each image in the gallery to Cloudinary and get their URLs
    const galleryImagesUrls = await Promise.all(galleryImages.map(async (image) => {
      const imagePath = image.path;
      // Upload image to Cloudinary and push the promise to the array
      return cloudinary.uploader.upload(imagePath);
    }));

    // Map the results to extract the secure URLs
    const galleryImagesSecureUrls = galleryImagesUrls.map(result => result.secure_url);

    // Create a new project instance using the uploaded image URLs
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
      projectImage: req.projectImage,
      mobileImage: req.mobileImage,
      tabletImage: req.tabletImage,
      galleryImages: galleryImagesSecureUrls, 
      clientInfo: clientInfoId || null,
      isFeatured: req.body.isFeatured,
    });

    // Save the new project to the database
    const savedProject = await newProject.save();

    // Respond with the saved project data
    res.status(201).json(savedProject);
    }
  } catch (error) {
    // Handle error
    console.error("Error adding project:", error);
    return res.status(500).send("Internal Server Error");
  }
};
