export const addTestimonial = async(req, res) =>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
    }
    catch (e){
            // Handle error
            console.error("Error adding client:", e);
            res.status(500).json({ e: "Internal Server Error" });
          }
}