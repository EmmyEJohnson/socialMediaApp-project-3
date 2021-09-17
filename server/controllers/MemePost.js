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
  let comments = req.body.comments;
  let author = req.body.author;

  const memepost = new MemePost({
    name: name,
    image: image,
    author: author,
    caption: caption,
    comments: comments,
  });

  console.log(memepost)
  
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

const index = (req, res) => {
    MemePost.find({}, (err, foundPosts) => {
        if (err) return console.log("Error in Posts#index:", err);

        return res.status(200).json({
            message: "Success",
            data: foundPosts,
        });
    });
};

const showMemePostById = (req, res) => {
    MemePost.findById(req.params.id, (err, foundPost) => {
        if (err) return console.log("Error in Posts#show:", err);

        return res.status(200).json({
            message: "Success",
            data: foundPost,
        });
    });
};

const showComments = (req, res) => {
    MemePost.findById(req.params.id)
    .then(foundPost => {
        if (!foundPost) return console.log("Error in Comment#show")

        return res.status(200).json({
            message: "Success",
            data: foundPost.comments,
        });
    })
    .catch(err => console.log(err))
};

const createComment = (req, res) => {
    MemePost.findById(req.params.id)
        .then(foundPost => {
            if (!foundPost) return console.log("Error in Comment#create:")
            
            foundPost.comments.push(req.body);
            foundPost.save();

            return res.status(201).json({
                message: "Success",
                data: foundPost.comments,
            });
        })
        .catch(err => console.log(err))
};

const updateComment = (req, res) => {
    db.Post.findById(req.params.id).then((foundPost) => {
        if (!foundPost) return console.log("Error in Comment#update");

        const commentById = foundPost.comments.id(req.params.commentId);
        commentById.author = req.body.author;
        commentById.content = req.body.content; 
        foundPost.save();

        return res.status(202).json({
            message: "Success",
            data: commentById,
        });
    });
};

const destroy = (req, res) => {
    MemePost.findByIdAndDelete(req.params.id, (err, deletedPost) => {
        if (err) console.log("Error in Posts#destroy:", err);

        return res.status(200).json({
            data: deletedPost,
        });
    });
};

const destroyComment = (req, res) => {
    MemePost.findById(req.params.id)
        .then(foundPost => {
            if (!foundPost) return console.log("Error in Comment#create")

            const commentById = foundPost.comments.id(req.params.commentId)
            console.log (commentById)
            commentById.remove();
            foundPost.save();

            return res.status(200).json({
                message: "Success",
                data: commentById,
            });
        })
};

module.exports = {
  createMemePost,
  index,
  showMemePostById,
  showComments,
  createComment,
  updateComment,
  destroy,
  destroyComment,
};
