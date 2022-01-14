const { Schema, model } = require('mongoose');

const invoiceSchema = Schema({
    invoiceId: {
        type: String,
        require: true
    },
    totalValue: {
        type: String,
        require: true
    },
    totalVat: {
        type: String,
        require: true
    },
    items: [{
        name: {
            type: String,
            require: true
        },
        value: {
            type: String,
            require: true
        },
        vat: {
            type: String,
            require: true
        },
    }],
    paid: {
        type: String,
        require: true
    }
});

module.exports = model('Invoice', invoiceSchema);