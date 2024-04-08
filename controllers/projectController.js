import { projectModel } from "../Model/projects.js";
import { clientModel } from "../model/Clients.js";
import { cloudinary } from "../utils/Cloudinary.js";

export const addProject = async (req, res) => {
  try {
    // Check for required fields
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    let clientInfoId = null;

        // Upload single images for projectImage, mobileImage, and tabletImage using upload.single()
    const projectImageUpload = await upload.single("projectImage")(req, res);
    const mobileImageUpload = await upload.single("mobileImage")(req, res);
    const tabletImageUpload = await upload.single("tabletImage")(req, res);

    // Handle potential upload errors
    if (
      projectImageUpload.error ||
      mobileImageUpload.error ||
      tabletImageUpload.error
    ) {
      return res.status(500).json({ error: "Error uploading images." });
    }

    const projectImagePath = projectImageUpload ? projectImageUpload.path : null; // Handle missing files gracefully
    const mobileImagePath = mobileImageUpload ? mobileImageUpload.path : null;
    const tabletImagePath = tabletImageUpload ? tabletImageUpload.path : null;

    // Upload gallery images using upload.array() for multiple file uploads
    const galleryImagesUpload = await upload.array("galleryImages", 5)(req, res);

    // Handle potential upload errors for gallery images
    if (galleryImagesUpload.error) {
      return res.status(500).json({ error: "Error uploading gallery images." });
    }

    // Extract uploaded gallery image paths
    const galleryImages = galleryImagesUpload.map((image) => image.path);

    const uploadedImages = async () => {
      const projectImageUrl = projectImagePath
        ? await uploadToCloudinary(projectImagePath)
        : null;
      const mobileImageUrl = mobileImagePath
        ? await uploadToCloudinary(mobileImagePath)
        : null;
      const tabletImageUrl = tabletImagePath
        ? await uploadToCloudinary(tabletImagePath)
        : null;
      const galleryImageUrls = await Promise.all(
        galleryImages.map((imagePath) => uploadToCloudinary(imagePath))
      );

      return {
        projectImageUrl,
        mobileImageUrl,
        tabletImageUrl,
        galleryImageUrls,
      };
    };

    const { projectImageUrl, mobileImageUrl, tabletImageUrl, galleryImageUrls } =
      await uploadedImages();

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
      projectImage: projectImageUrl,
      mobileImage: mobileImageUrl,
      tabletImage: tabletImageUrl,
      galleryImages: galleryImageUrls,
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
