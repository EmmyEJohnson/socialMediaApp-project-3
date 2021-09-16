// Memeposts Router
const router = require('express').Router();
const MemePost = require('../controllers/MemePost');

//use multer
const uploadMulter = require('../middlewares/upload');
//use validation to avoid invalid upload
const validation = require('../middlewares/validation');

//let's try it
router.post('/', uploadMulter, validation, MemePost.createMemePost);
router.get('/', MemePost.index)
router.get("/:id", MemePost.showMemePostById);
router.get("/:id/comments", MemePost.showComments);
router.post("/:id/comment", MemePost.createComment);
router.put("/:id/comment/:commentId", MemePost.updateComment);
router.delete("/:id", MemePost.destroy);
router.delete("/:id/comment/:commentId", MemePost.destroyComment);

module.exports = router;
