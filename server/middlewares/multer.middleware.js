const multer = require('multer');
const path = require('path'); // Import the path module
const fs = require('fs'); // Import fs to check the existence of directories

// Configure storage with absolute path resolution
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Resolve the absolute path for the destination folder
    const destPath = path.resolve(__dirname, "../public/temp");

    // Check if the directory exists
    if (!fs.existsSync(destPath)) {
      console.error(`Directory does not exist: ${destPath}`);
      return cb(new Error("Destination directory does not exist"), null);
    }

    cb(null, destPath); // Use the resolved path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save file with its original name
  }
});

// Create an instance of multer with the defined storage
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Optional: Limit file size to 10MB
});

// Export the upload middleware
module.exports = upload;
