export const uploadToImageBBMiddleware = async (req, res, next) => {
  try {
    console.log(req.files);
    if (!req.files['projectImage'] || !req.files['mobileImage'] || !req.files['tabletImage']) {
      return res.status(400).json({ error: "One or more image files are missing." });
    }

    const projectImageUpload = await uploadToImageBB(req.files['projectImage'][0].path);
    const mobileImageUpload = await uploadToImageBB(req.files['mobileImage'][0].path);
    const tabletImageUpload = await uploadToImageBB(req.files['tabletImage'][0].path);

    req.uploadedImages = {
      projectImage: projectImageUpload.url,
      mobileImage: mobileImageUpload.url,
      tabletImage: tabletImageUpload.url
    };

    next();
  } catch (error) {
    console.error("Error uploading images to ImageBB:", error);
    return res.status(500).send("Internal Server Error");
  }
};

