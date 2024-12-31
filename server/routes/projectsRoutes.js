const express = require('express'); 
const { addProject, getProjects, updateProject, deleteProject, getProjectsForPortfolio } = require('../controllers/projectsControllers');
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const upload = require('../middlewares/multer.middleware');
const router = express.Router();


router.post('/user/projects/addProjects', isAuthenticated,upload.fields([        {
    name: "projectImage",
    maxCount: 1
}]),addProject);        
router.get('/user/projects/getProjects', isAuthenticated,getProjects);        
router.put('/user/updateProject', isAuthenticated,upload.fields([        {
    name: "projectImage",
    maxCount: 1
}]),updateProject);  
router.delete('/user/deleteProject', isAuthenticated,deleteProject);
router.get('/user/getProjectsForPortfolio/:username',getProjectsForPortfolio)
module.exports = router;
