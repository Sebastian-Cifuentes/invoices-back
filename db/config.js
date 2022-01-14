const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        mongoose.connection.openUri(process.env.MONGODB_URI || 'mongodb://localhost:27017/invoicesDB', (err, res) => {
            if (err) throw err;
            console.log('Data base: \x1b[32m%s\x1b[0m', 'online');
        });

    } catch (error) {

    }
};

module.exports = {
    dbConnection
};