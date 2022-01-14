const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarjwt = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Error en el token'
        });
    }

    try {

        const { id, email, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.id = id;
        req.name = name;
        req.email = email;

    } catch (err) {
        return res.status(401).json({
            ok: false,
            message: 'Token no valido'
        });

    }

    next();
};

module.exports = {
    validarjwt
};