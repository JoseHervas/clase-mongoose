const mongoose = require('mongoose');
const secrets = require('../config/secrets');
const autores = require('../models/autores.model');

//Conectarse a mongo!
mongoose.connect(secrets.mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Crear las funciones que irán asociadas a los endpoints

//CRRUD

//1.- CREATE
exports.registrarAutor = async (req, res) => {
    //Checkear el body
    const nuevoAutor = new autores({
        "_id": mongoose.Types.ObjectId(),
        "firstName": req.body.firstName,
        "secondName": req.body.secondName,
        "age": req.body.age
    });
    try {
        const result = await nuevoAutor.save();
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send({"error": "No se ha podido registrar el usuario"})
    }
}