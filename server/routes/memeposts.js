// Memeposts Router
const router = require('express').Router();
const { createMemePost } = require('../controllers/MemePost');

//use multer
const uploadMulter = require('../middlewares/upload');
//use validation to avoid invalid upload
const validation = require('../middlewares/validation');

//let's try it
router.post('/', uploadMulter, validation, createMemePost);

// router.post('')

module.exports = router;
