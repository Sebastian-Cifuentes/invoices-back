const jwt = require('jsonwebtoken');

const generateJwt = (id, email, name) => {

    const payload = { id, email, name };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '72h'
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });

};

module.exports = {
    generateJwt
};