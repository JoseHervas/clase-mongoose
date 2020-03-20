const mongoose = require('mongoose');
const secrets = require('../config/secrets');
const autores = require('../models/autores.model');
const recetas = require('../models/recetas.model')

//Conectarse a mongo!
mongoose.connect(secrets.mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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

//2.- UPDATE
exports.actualizarAutor = async (req, res) => {
    //Checkear el body
    const id = req.body._id;
    try {
        const result = await autores.findByIdAndUpdate(id, {
            $set: {
                "firstName": req.body.firstName,
                "secondName": req.body.secondName,
                "age": req.body.age,
                "__v": req.body.__v
            }
        })
        res.send({"ok": "usuario modificado"})
    } catch (error) {
        console.log(error);
        res.send({"error": "el usuario no se ha podido modificar"})
    }
}

// 3.- Read (single)
exports.leerAutorPorId = async (req, res) => {
    const _id = req.params._id;
    try {
        const usuario = await autores.find({
            "_id": _id
        })
        res.send(usuario)
    } catch (error) {
        console.log(error);
        res.send({"error": "usuario no encontrado!"})
    }
}

// 4.- Read (all)
exports.leerTodosLosAutores = async (req, res) => {
    try {
        const usuario = await autores.find()
        res.send(usuario)
    } catch (error) {
        console.log(error);
        res.send({"error": "usuario no encontrado!"})
    }
}

// 5.- Delete
exports.eliminarAutorPorId = async (req, res) => {
    const _id = req.params._id;
    try {
        const result = await autores.findByIdAndDelete(_id);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send({"error": "el usuario no se ha podido eliminar"})
    }
}

// 6.- Create RECETA
exports.registrarReceta = async (req, res) => {
    //Checkear el body
    const nuevoReceta = new recetas({
        "_id": mongoose.Types.ObjectId(),
        "name": req.body.name,
        "ingredientes": req.body.ingredientes,
        "author_id": req.body.author_id
    });
    try {
        const result = await nuevoReceta.save();
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send({"error": "No se ha podido registrar la receta"})
    }
}

//7.- GET (single receta)
exports.leerRecetaPorId = async (req, res) => {
    const _id = req.params._id;
    try {
        const receta = await recetas.find({
            "_id": _id
        })
        const author = await autores.find({
            "_id": receta[0].author_id
        })
        res.send({"receta": receta, "author": author})
    } catch (error) {
        console.log(error);
        res.send({"error": "receta no encontrada!"})
    }
}
