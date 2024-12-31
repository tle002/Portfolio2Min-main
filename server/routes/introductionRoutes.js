
const express = require('express');
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const { createIntroduction, getIntroduction, updateIntroduction, deleteIntroduction, getIntroductionForPortfolio } = require('../controllers/introductionController');
const upload = require('../middlewares/multer.middleware');
const router = express.Router();
router.post('/user/createIntro', isAuthenticated,upload.fields([{
    name: "image",
    maxCount: 1
}]),createIntroduction);
router.get('/user/getIntro', isAuthenticated,getIntroduction);
router.get('/user/getIntroForPortfolio/:username', getIntroductionForPortfolio);
router.put('/user/updateIntro', isAuthenticated,upload.fields([{
    name: "image",
    maxCount: 1
}]),updateIntroduction);
router.delete('/user/deleteIntro', isAuthenticated,deleteIntroduction);

module.exports = router;
