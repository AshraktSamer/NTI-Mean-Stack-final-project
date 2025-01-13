const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the folder where files will be saved
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      // Define the file naming logic
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

const upload = multer({storage})

module.exports = upload;

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(req.body);

//     if (req.body.type === "product") {
//       cb(null, path.join(__dirname, "uploads/products"));
//     } else if (req.body.type === "user") {
//       cb(null, path.join(__dirname, "uploads/users"));
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
