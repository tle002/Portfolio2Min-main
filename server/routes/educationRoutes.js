const express = require('express');
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const { addEducation, getEducation, updateEducation, deleteEducation, getEducationForPortfolio } = require('../controllers/educationControllers');
const router = express.Router();

router.post('/user/createEdu', isAuthenticated,addEducation);
router.get('/user/getEdu', isAuthenticated,getEducation);
router.get('/user/getEduForPortfolio/:username', getEducationForPortfolio);
router.put('/user/updateEdu', isAuthenticated,updateEducation);
router.delete('/user/deleteEdu', isAuthenticated,deleteEducation);

module.exports = router;
