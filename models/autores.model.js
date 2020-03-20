const mongoose = require('mongoose');

//Guardarme en una variable todos los tipos de dato que puedo usar
const types = mongoose.Schema.Types;

//Crear un mini-schema para autores
const autoresSchema = new mongoose.Schema({
    "_id": {
        type: types.ObjectId,
        required: [true, "Falta el ID"]
    },
    "firstName": {
        type: types.String,
        required: [true, "Falta el nombre"],
        minlength: [3, "El nombre no puede ser tan corto."],
        maxlength: [100, "El nombre no puede ser tan largo."]
    }, 
    "secondName": {
        type: types.String,
        required: [true, "Falta el nombre"],
        minlength: [3, "El apellido no puede ser tan corto."],
        maxlength: [100, "El apellido no puede ser tan largo."]
    },
    "age": {
        type: types.Number,
        required: [false],
        min: [12, "Demasiado bebé"],
        max: [120, "Demasiado mayor"]
    }
})

module.exports = mongoose.model('autores', autoresSchema)

