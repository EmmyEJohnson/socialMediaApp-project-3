const multer = require('multer');
const path = require('path');

// first set storage i.e file name and destination
const storage = multer.diskStorage({
  //destination uploads folder name
  destination: function (req, res, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    //generate unique filename for each image
    cb(null, 'congar' + '-' + Date.now() + path.extname(file.originalname));
  },
});

//file filter we accept any file and we do validation

const filerFilter = (req, file, cb) => {
  // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //     cb(null, true)
  // } else {
  cb(null, true);
  // }
};

let upload = multer({
  storage: storage,
  fileFilter: filerFilter,
});

//export upload as single file you can use multiple files
module.exports = upload.single('image');
