const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role válido'
};

let Schema  = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'] // Si es requerido o no y el mensaje que se desea mostrar 
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String, // Tipo de dato
        default: 'USER_ROLE', // Valor por defecto
        enum: rolesValidos // Sirve para validar valores que uno quiera como permitidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
}); 
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

module.exports = mongoose.model('Usuario', usuarioSchema);