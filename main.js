const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mainController = require('./controllers/main.controller')

const server = express();

server.use(helmet());
server.use(bodyParser.json());

server.post("/nuevoAutor", mainController.registrarAutor);

server.put("/actualizarAutor", mainController.actualizarAutor);

server.get("/autor/:_id", mainController.leerAutorPorId);

server.get("/autores", mainController.leerTodosLosAutores);

server.delete("/eliminarAutor/:_id", mainController.eliminarAutorPorId)

server.post("/registrarReceta", mainController.registrarReceta)

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log( `Servidor escuchando en el puerto ${PORT}`)
});