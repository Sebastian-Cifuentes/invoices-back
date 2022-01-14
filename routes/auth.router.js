const { Router } = require('express');
const { login, register, userCurrent } = require('../controllers/auth.controller');
const { validarjwt } = require('../middlewares/validarjwt');

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/userCurrent', validarjwt, userCurrent);

module.exports = router;