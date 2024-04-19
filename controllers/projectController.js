import { ObjectId } from "mongodb";
import { projectModel } from "../Model/projects.js";
import { clientModel } from "../model/Clients.js";
import { cloudinary } from "../utils/Cloudinary.js";
// add project controller
export const addProject = async (req, res) => {
  try {
    // Check for required fields
    if (!req.body.title || !req.body.description || !req.body.projectImage) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // Check if a client with the provided clientName and clientEmail exists
    const existingClient = await clientModel.findOne({
      clientName: JSON.parse(req.body.clientInfo).clientName,
      clientEmail: JSON.parse(req.body.clientInfo).clientEmail
    });
    console.log(JSON.parse(req.body.clientInfo).clientEmail);
    let clientInfoId = null;

  //  check if client already exist
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

    // ---------------------
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
  } 
  
catch (error) {
    // Handle error
    console.error("Error adding project:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// get projects controller
export const getProjects = async (req, res)=>{
  try{
   const projects = await projectModel.find();
   if(projects.length === 0){
   return res.status(400).json({message: "No Products Found."})
   }
   res.json(projects)
  } catch (e){
    res.status(500).json({error: "Internal Server Error"})
  }
}

// delete one project 
export const deleteProject = async(req, res)=>{
  try{
    const projectId = req.params.id;
    const project = await projectModel.deleteOne({_id: new ObjectId(projectId)})
    if(project){
      return res.status(200).json({message: "Project deleted successfully."})
    }
    else{
      return res.status(300).json({error: "Failed to delete project"})
    }
  }
  catch (e){
    res.status(500).json({error: "Internal Server Error"})
  }
}