var mysql = require('mysql2')
const connection = mysql.createConnection({
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '12345678',
    DB: 'epayment',
    port: 3306,
    multipleStatements: true,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    }
})

module.exports = connection;