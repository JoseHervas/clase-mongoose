const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const recetasSchema = new mongoose.Schema({
    "_id": {
        type: types.ObjectId,
        required: [true, "Necesitas un ID"]
    }, 
    "name": {
        type: types.String,
        required: [true, "Te falta el nombre"],
        minlength: [5, "El nombre es demasiado corto"],
        maxlength: [200, "El nombre es demasiado largo"]
    },
    "ingredientes": [
        {
            type: types.String
        }
    ], 
    "author_id": {
        ref: "autores",
        type: types.ObjectId,
        required: [true, "Se necesita un autor"]
    }
})

module.exports = mongoose.model("recetas", recetasSchema)