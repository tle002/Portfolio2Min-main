const express = require('express'); 
const { register, login, logout, getEmail } = require('../controllers/authController');
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/logout', logout);
router.get('/getEmail/:username', getEmail);

module.exports = router;
