const fs = require('fs');
module.exports = (req, res, next) => {
  //first we save the meme name and image
  //valid req.body or req.file to not get undefined
  if (typeof req.file === 'undefined' || typeof req.body === 'undefined') {
    //if error occurs
    return res.status(400).json({
      error: 'No image or name provided',
    });
  }

  //get image and name
  console.log(req.file);
  let image = req.file.path;
  let name = req.body.name;

  //check image type we accept png || jpg || jpeg || heic

  if (
    !req.file.mimetype.includes('jpeg') &&
    !req.file.mimetype.includes('png') &&
    !req.file.mimetype.includes('jpg') &&
    !req.file.mimetype.includes('heic') &&
    !req.file.mimetype.includes('JPEG') &&
    !req.file.mimetype.includes('PNG') &&
    !req.file.mimetype.includes('JPG') &&
    !req.file.mimetype.includes('HEIC')
  ) {
    //first remove file
    fs.unlinkSync(image);
    return res.status(400).json({
      errors: 'Image type not supported',
    });
  }

  //check file size max file size 3mb
  if (req.file.size > 1024 * 1024 * 3) {
    fs.unlinkSync(image);
    return res.status(400).json({
      errors: 'Image size too large',
    });
  }

  if (!name || !image) {
    return res.status(400).json({
      errors: 'No image or name provided',
    });
  }

  next();
};
