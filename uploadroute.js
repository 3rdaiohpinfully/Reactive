const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controller/uploadController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.fields([{ name: 'image' }, { name: 'audio' }]), uploadFile);

module.exports = router;
