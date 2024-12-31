const express = require('express');

const { isAuthenticated } = require('../middlewares/auth-Middleware');
const { addExperience, getExperiences,updateExperience, deleteExperience, getExperienceForPortfolio } = require('../controllers/experienceController');
const router = express.Router();

router.post('/user/createExp', isAuthenticated,addExperience);
router.get('/user/getExp', isAuthenticated,getExperiences);
router.get('/user/getExpForPortfolio/:username', getExperienceForPortfolio);
router.put('/user/updateExp', isAuthenticated,updateExperience);
router.delete('/user/deleteExp', isAuthenticated,deleteExperience);

module.exports = router;
