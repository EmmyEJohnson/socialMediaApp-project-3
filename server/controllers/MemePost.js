//Post Controller
const db = require('../models');

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

module.exports = {
  createMemePost,
};
