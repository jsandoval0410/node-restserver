


// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento del token
// 60 segundos 60 minutos 24 horas 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// Seed de autenticación
process.env.SEED = process.env.SEED || 'seedDesarrollo';

// Base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.urlDB = urlDB;

// Google Client Id
process.env.CLIENT_ID = process.env.CLIENT_ID || '816851755080-tp4p3col9mknroo51ib3gibfghu29a9i.apps.googleusercontent.com';
