const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
const app = express();

require('dotenv').config();
dbConnection();

//CORS
app.use(cors());


//LECTURA
app.use(express.json());

app.use('/auth', require('./routes/auth.router'));
app.use('/invoice', require('./routes/invoice.router'));

app.use('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'Exito'
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Run back in ${process.env.PORT}`);
});