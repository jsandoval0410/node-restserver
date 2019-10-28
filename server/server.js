require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// GET
app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});
// POST
app.post('/usuario', (req, res) => {
    let body = req.body;
    if (!body.nombre) {
        // Se utiliza para retornar el código que uno quiera
        res.status(400).json({
            ok: false,
            message: 'El nombre es necesario'
        });
    } else {
        // Se retorna la información que se quiera
        res.json({
            body
        });
    }
});
// PUT
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});
// DELETE
app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', 3000);
})