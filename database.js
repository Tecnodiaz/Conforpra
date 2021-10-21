const { createConnection } = require ('promise-mysql');

const conexion = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'conforpra'
})

function getconexion() {
    return conexion;
}

module.exports = {getconexion}
