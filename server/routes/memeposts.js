// Memeposts Router
const router = require('express').Router();
const { createMemePost } = require('../controllers/MemePost');
const { posts } = require("../controllers");// JARED ADDED

//use multer
const uploadMulter = require('../middlewares/upload');
//use validation to avoid invalid upload
const validation = require('../middlewares/validation');

//let's try it
router.post('/', uploadMulter, validation, createMemePost);
router.get("/", posts.index); // JARED ADDED

// router.post('')

module.exports = router;
