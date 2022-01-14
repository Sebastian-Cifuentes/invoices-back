const { response, request } = require('express');
const Invoice = require('../models/Invoice');

const create = async(req = request, res = response) => {


    const { invoiceId } = req.body;

    try {

        const invoice = await Invoice.findOne({ invoiceId });

        if (invoice) {
            return res.status(400).json({
                ok: false,
                message: 'Factura ya existe'
            });
        }

        const nInvoice = new Invoice(req.body);
        await nInvoice.save();

        return res.status(201).json({
            ok: true,
            message: 'Factura creada con exito',
            invoice: nInvoice
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });
    }

};

const remove = async(req = request, res = response) => {

    const { id } = req.params;

    try {

        const invoice = await Invoice.findByIdAndRemove({ _id: id });

        if (!invoice) {
            return res.status(400).json({
                ok: false,
                message: 'Factura no existe'
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Factura eliminada'
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });

    }


};

const update = async(req = request, res = response) => {

    const { id } = req.params;

    try {

        let invoice = await Invoice.findByIdAndUpdate({ _id: id }, req.body);

        if (!invoice) {
            return res.status(400).json({
                ok: false,
                message: 'Factura no encontrada'
            });
        }
        invoice = {...req.body };

        return res.status(200).json({
            ok: true,
            message: 'Factura actualizada',
            invoice
        });



    } catch (error) {

        return res.status(500).json({
            ok: false,
            message: 'Error en el servidor',
            error
        });

    }

};

const getAll = async(req = request, res = response) => {


    try {

        const invoices = await Invoice.find();

        if (!invoices) {
            return res.status(400).json({
                ok: false,
                message: 'No se encontraron facturas'
            });
        }

        return res.status(200).json({
            ok: true,
            invoices
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });
    }

};

const getById = async(req = request, res = response) => {

    const { id } = req.params;

    try {

        const invoice = await Invoice.findById({ _id: id });

        if (!invoice) {
            return res.status(400).json({
                ok: false,
                message: 'No se encontro una factura'
            });
        }

        return res.status(200).json({
            ok: true,
            invoice
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
    create,
    remove,
    update,
    getAll,
    getById
};