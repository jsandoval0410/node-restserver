
const express = require('express');
const bcrypt = require('bcrypt');
const _= require('underscore');
const Usuario = require('../models/usuario');
const app = express();
// GET
app.get('/usuario', (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    Usuario.find({estado: true}, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Usuario.countDocuments({estado: true}, (err, conteo) => {
            res.json({
                ok: true,
                usuarios,
                cuantos: conteo
            });
        });
    });
});

// POST
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
// PUT
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);
    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err 
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
// DELETE
app.delete('/usuario/:id', (req, res) => {
    const id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, delUser) => { esta linea de código es para eliminar un registro de DB y la otra es solos para cambiar el valor al campo estado 
        let cambiaEstado = {
            estado: false
        };
        Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, delUser) => {
        if (err) {
            return res.status(400).json({ok: false, err});
        }
        if (!delUser) {
            return res.status(400).json({ok: false, err: {message: 'Usuario no encontrado'}});
        }
        res.json({ok: true, usuario: delUser});
    });


});

module.exports = app;