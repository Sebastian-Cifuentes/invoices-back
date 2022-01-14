const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Email no encontrado'
            });
        }

        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                message: 'La contraseña no coincide'
            });
        }

        const token = await generateJwt(user._id, user.email, user.name);

        return res.json({
            ok: true,
            user,
            token
        });


    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }

};

const register = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario se encuentra registrado'
            });
        }

        const newUser = new User(req.body);
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        return res.status(201).json({
            ok: true,
            user: newUser,
            message: 'Usuario creado exitosamente'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });
    }

};

const userCurrent = async(req = request, res = response) => {

    const { id } = req;

    try {

        const user = await User.findById({ _id: id });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'No se encontro el usuario'
            });
        }

        return res.status(200).json({
            ok: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });
    }

};

module.exports = {
    login,
    register,
    userCurrent
};