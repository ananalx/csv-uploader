import multer from "multer";
import path from "path";

export const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "text/csv" ||
      path.extname(file.originalname).toLowerCase() !== ".csv"
    ) {
      return cb(new Error("Only CSV files are allowed"));
    }
    cb(null, true);
  },
});
