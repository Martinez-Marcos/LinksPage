const mysql = require('mysql');
const util = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LS') {
            console.error('DATEBASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATEBASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

//promisify poolquery convertir callbacks en promesas
pool.query = util.promisify(pool.query);

module.exports = pool;

