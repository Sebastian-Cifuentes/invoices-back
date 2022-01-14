const { Router } = require('express');
const { getAll, create, update, remove, getById } = require('../controllers/invoice.controller');
const { validarjwt } = require('../middlewares/validarjwt');

const router = Router();


router.get('/getAll', validarjwt, getAll);
router.get('/getById/:id', validarjwt, getById);
router.post('/create', validarjwt, create);
router.put('/update/:id', validarjwt, update);
router.delete('/remove/:id', validarjwt, remove);

module.exports = router;