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
      clientName: JSON.parse(req.body.clientInfo).clientName,
      clientEmail: JSON.parse(req.body.clientInfo).clientEmail
    });
    console.log(JSON.parse(req.body.clientInfo).clientEmail);
    let clientInfoId = null;

    if (existingClient) {
      // If the client already exists, use its ObjectId
      clientInfoId = existingClient._id;
    } else {
      // Create a new client instance
      const newClient = new clientModel({
        clientName: JSON.parse(req.body.clientInfo).clientName,
        clientEmail: JSON.parse(req.body.clientInfo).clientEmail,
        clientSocialMedia: JSON.parse(req.body.clientInfo).clientSocialMedia
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
    
    if (existingProject) {
      return res.status(400).json({ error: "Project already exists.", existingProject: true });
    } else {

      const galleryImages = req.files['galleryImages'];

      const galleryImagesUrls = await Promise.all(galleryImages.map(async (image) => {
        const imagePath = image.path;
        return cloudinary.uploader.upload(imagePath);
      }));

      const galleryImagesSecureUrls = galleryImagesUrls.map(result => result.secure_url);

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
        projectImage: req.body.projectImage,
        mobileImage: req.body.mobileImage,
        tabletImage: req.body.tabletImage,
        galleryImages: galleryImagesSecureUrls,
        clientInfo: clientInfoId || null,
        isFeatured: req.body.isFeatured,
      });
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
