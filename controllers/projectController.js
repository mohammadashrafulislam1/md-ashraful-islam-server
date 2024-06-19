import { ObjectId } from "mongodb";
import { projectModel } from "../model/Projects.js";
import { clientModel } from "../model/Clients.js";
import { cloudinary } from "../utils/cloudinary.js";
import { testimonialModel } from "../model/Testimonial.js";

// Add project controller
export const addProject = async (req, res) => {
  try {
    // Check for required fields
    if (!req.body.title || !req.body.description || !req.body.projectImage) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    console.log("Request Body:", req.body);
    console.log("Client Info:", req.body.clientInfo);
    console.log("Testimonial Data:", req.body.testimonial);

    // Check if a client with the provided clientName and clientEmail exists
    const clientInfo = JSON.parse(req.body.clientInfo);
    const existingClient = await clientModel.findOne({
      clientName: clientInfo.clientName,
      clientEmail: clientInfo.clientEmail
    });

    let clientInfoId = null;
    if (existingClient) {
      clientInfoId = existingClient._id;
    } else {
      const clientPhotoUrl = await cloudinary.uploader.upload(clientInfo.clientPhoto);
      const newClient = new clientModel({
        clientPhoto: clientPhotoUrl.secure_url,
        clientName: clientInfo.clientName,
        clientEmail: clientInfo.clientEmail,
        clientSocialMedia: clientInfo.clientSocialMedia
      });
      const clientResult = await newClient.save();
      clientInfoId = clientResult._id;
    }

    // Check if a testimonial with the provided details exists
    const testimonialData = JSON.parse(req.body.testimonial);

    const existingTestimonial = await testimonialModel.findOne({
      email: testimonialData.email
    });
    let testimonialId = null;
    if (existingTestimonial) {
      testimonialId = existingTestimonial._id;
    } else {
      const clientPhotoUrl = await cloudinary.uploader.upload(clientInfo.clientPhoto);
      const newTestimonial = new testimonialModel({
        image: clientPhotoUrl.secure_url,
        name: testimonialData.name,
        email: testimonialData.email,
        testimonial: testimonialData.testimonial,
        rating: testimonialData.rating,
        des: testimonialData.des,
        socialMedia: testimonialData.socialMedia
      });
      const testimonialResult = await newTestimonial.save();
      testimonialId = testimonialResult._id;
    }

    // Check if the project already exists
    const existingProject = await projectModel.findOne({ title: req.body.title });
    if (existingProject) {
      return res.status(400).json({ error: "Project already exists.", existingProject: true });
    }

    // Upload gallery images
    const galleryImages = req.files['galleryImages'];
    const galleryImagesUrls = await Promise.all(galleryImages.map(async (image) => {
      const imagePath = image.path;
      return cloudinary.uploader.upload(imagePath);
    }));

    const galleryImagesSecureUrls = galleryImagesUrls.map(result => result.secure_url);

    // Create new project
    const newProject = new projectModel({
      title: req.body.title,
      description: req.body.description,
      projectCategory: req.body.projectCategory,
      projectUrl: req.body.projectUrl,
      githubUrl: req.body.githubUrl,
      githubUrlServer: req.body.githubUrlServer,
      technologies: req.body.technologies,
      duration: req.body.duration,
      challenges: req.body.challenges,
      userName: req.body.userName || "Md Ashraful Islam",
      userEmail: req.body.userEmail || "mohammadashrafulislam33@gmail.com",
      projectImage: req.body.projectImage,
      mobileImage: req.body.mobileImage,
      tabletImage: req.body.tabletImage,
      galleryImages: galleryImagesSecureUrls,
      clientInfo: clientInfoId,
      testimonial: testimonialId,
      isFeatured: req.body.isFeatured,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get projects controller
export const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();
    if (projects.length === 0) {
      return res.status(400).json({ message: "No Products Found." });
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get one project
export const getOneProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await projectModel.findOne({ _id: new ObjectId(projectId) });
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete one project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await projectModel.deleteOne({ _id: new ObjectId(projectId) });
    if (project) {
      return res.status(200).json({ message: "Project deleted successfully." });
    } else {
      return res.status(300).json({ error: "Failed to delete project" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update project by ID
export const updateProjectController = async (req, res) => {
  try {
    const projectId = req.params.id;
    const body = req.body;

    // Check if the project exists
    const existingProject = await projectModel.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update the project fields
    existingProject.title = body.title || existingProject.title;
    existingProject.description = body.description || existingProject.description;
    existingProject.projectCategory = body.projectCategory || existingProject.projectCategory;
    existingProject.projectUrl = body.projectUrl || existingProject.projectUrl;
    existingProject.githubUrl = body.githubUrl || existingProject.githubUrl;
    existingProject.githubUrlServer = body.githubUrlServer || existingProject.githubUrlServer;
    existingProject.technologies = body.technologies || existingProject.technologies;
    existingProject.duration = body.duration || existingProject.duration;
    existingProject.challenges = body.challenges || existingProject.challenges;
    existingProject.userName = body.userName || existingProject.userName;
    existingProject.userEmail = body.userEmail || existingProject.userEmail;
    existingProject.projectImage = body.projectImage || existingProject.projectImage;
    existingProject.mobileImage = body.mobileImage || existingProject.mobileImage;
    existingProject.tabletImage = body.tabletImage || existingProject.tabletImage;
    existingProject.isFeatured = body.isFeatured || existingProject.isFeatured;

    // Handle gallery images
    if (req.files && req.files['galleryImages']) {
      const galleryImages = req.files['galleryImages'];
      const galleryImagesUrls = await Promise.all(galleryImages.map(async (image) => {
        const imagePath = image.path;
        return cloudinary.uploader.upload(imagePath);
      }));
      existingProject.galleryImages = galleryImagesUrls.map(result => result.secure_url);
    }

    // Save the updated project
    const updatedProject = await existingProject.save();

    return res.json(updatedProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
