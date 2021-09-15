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

//Index -GET-Presentational  (all of a resource)
const index = (req,res) => {
    db.Post.find({}, (err, foundPost) => {
        if (err) return console.log("Error in Post#index: ", err);

        return res.status(200).json({
            message: "Success",
            data: foundPost,
        });
    });
};

//Show -GET- Presentational (id)
const show = (res,req) => {
    db.Post.findById(req.params.id, (err, foundPost) => {
        if (err) return console.log("Error in Post#how", err);

        return res.status(200).json({
            message:'Success',
            data: foundPost,
        });
    });
};

//SHOW -GET- Presentational (for comments)
const showComments = (req,res) => {
    db.Post.findById(req.params.id)
    .then(foundPost => {
        if (!foundPost) return console.log('Error in Comment#show')

        return res.status(200).json({
            message: 'success',
            data: foundPost.comments,
        });
    });
};

//Create -POST- Functional (status code 201)
const create = (req, res) => {
    db.Post.create("/", upload.single("postImage"),(req.body, (err, savedPost) => {
        if (err) return console.log("Error in Post#create: ", err);

        const newPostImage = new PostImages({
            author: req.body.author,
            postImage: req.file.originalname,
            caption: req.body.caption,
          });
          newPostImage
          .save()
          .then(() => res.json("New Image Posted!"))
          .catch((err) => res.status(400).json(`Error: ${err}`));

        return res.status(201).json({
            message: 'Success',
            data: savedPost,
        });
    }));
};

//Create -POST- Functional (For Comments)
const createComment = (req, res) => {
    db.Post.findById(req.params.id)
    .then(foundPost => {
        if (!foundPost) return console.log("Error in Comment#create:")

        foundPost.comments.push(req.body);
        foundPost.save();

        return res.status(201).json({
            message: 'Success',
            data: foundPost.comments,
        });
    })
    .catch(err => console.log(err))
};

//Update -PUT- Functional (id)
const update = ("/update/:id", upload.single("postImage"), (req, res) => {
    db.Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        req.file.originalname,
        (err, updatedPost) => {
            if (err) console.log("Error in Post#update:", err);

            return res.status(202).json({
                data: updatedPost,
            });
        }
    );
});

//Update -PUT- Functional (for Comments)
const updateComments = (req, res) => {
    db.Post.findById(req.params.id)
    .then(foundPost => {
        if (!foundPost) return console.log('Error in Comments#update')

        const commentById = foundPost.comments.id(req.params.commentId)
        commentById.author = req.body.author;
        commentById.body = req.body.body;
        foundPost.save();

        return res.status(202).json({
            message: "Success",
            data: commentById,
        });
    })
};

//Destroy - DELETE- Functional (id)
const destroy = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
        if (err) return console.log('Error in Post#destroy:', err);

        return res.status(200).json({
            data: deletedPost,
        });
    });
};

//Destroy -DELETE- Functional (For Comments)
const destroyComment = (req, res) => {
    db.Post.findById(req.params.id)
    .then(foundPost => {
        if (!foundPost) return console.log('Error in Comment#create')
        
        const commentById = foundPost.comments.id(req.params.commentId)
        //console.log(commentById)
        commentById.remove();
        foundPost.save();

        return res.status(200).json({
            message: "Success",
            data: commentById,
        });
    })
};

module.exports = {
    index,
    show,
    showComments,
    create,
    createComment,
    update,
    updateComments,
    destroy,
    destroyComment
};