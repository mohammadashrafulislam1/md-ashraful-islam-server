import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
// Set a higher file size limit (e.g., 20 MB)
const fileSizeLimit = 20 * 1024 * 1024; // 20 MB in bytes

const upload = multer({ storage: storage,
    limits: { fileSize: fileSizeLimit } })

export { upload };