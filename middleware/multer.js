// Configure Multer for single file uploads and array upload for galleryImages
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Temporary storage for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]); // Generate unique filenames
    },
  });
  
  const upload = multer({ storage: storage });