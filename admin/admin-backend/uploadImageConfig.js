const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images'); // Destination folder for image uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Customize the filename
  },
});

const uploadImage = multer({ storage: storage });

module.exports=uploadImage;