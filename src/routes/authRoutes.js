const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getUserIdFromToken  } = require('../controllers/authController');
const { requireAuth } = require('../middlewares/authMiddleware');

// Rota para autenticar o usuário
router.post('/login', loginUser);

// Rota para cadastrar um novo usuário
router.post('/signup', signupUser);

// Rota para obter o ID do usuário com base no token
router.get('/user-id', requireAuth, getUserIdFromToken);

module.exports = router;