const express = require('express'); 
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const { addSkill, getSkills, updateSkill, deleteSkill, getSkillsForPortfolio } = require('../controllers/skillsControllers');
const router = express.Router();

router.post('/user/skills/addSkills', isAuthenticated,addSkill);
router.get('/user/getSkills', isAuthenticated,getSkills);
router.get('/user/getSkillForPortfolio/:username', getSkillsForPortfolio);
router.put('/user/updateSkills', isAuthenticated,updateSkill);
router.delete('/user/deleteSkills', isAuthenticated,deleteSkill);

module.exports = router;
