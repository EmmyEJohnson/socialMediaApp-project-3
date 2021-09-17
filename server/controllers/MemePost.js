//Post Controller
const db = require('../models');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/uploads/")
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    }
  })

 const upload = multer({storage: storage});

const MemePost = require('../models/MemePost');

const createMemePost = (req, res) => {
  let name = req.body.name;
  let image = req.file.path;
  let caption = req.body.caption;
  //   let comments = [req.body.comments];

  const memepost = new MemePost({
    name: name,
    image: image,
    // author: author,
    caption: caption,
    // comments: comments,
  });

  memepost.save((err, memepost) => {
    if (err) {
      return res.status(400).json({
        errors: err.message,
      });
    }

    return res.status(200).json({
      message: 'Meme Post Created',
      memepost,
    });
  });
};

// Index - GET - Presentational (all of one resource) // JARED ADDED
const index = (req, res) => {
  db.Post.find({}, (err, foundPosts) => {
      if (err) return console.log("Error in Posts#index:", err);

      return res.status(200).json({
          message: "Success",
          data: foundPosts,
      });
  });
};


module.exports = { createMemePost, index };