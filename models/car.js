const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    _id:{
type: String,
required: true
    },
    tipo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    kilometraje: {
        type: String,
        required: true
    },
    factura: {
        type: String,
        required: true
    },
    npropietarios: {
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    contacto: {
        type: String,
        required: true
    },
    placas: {
        type: String,
        required: false
    },
    niv: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    disponible: {
        type: Boolean,
        required: true
    }   
});

module.exports = mongoose.model('Car', carSchema)