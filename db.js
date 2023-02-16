const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'students',
    password: 'prajwal',
    port: 5432
})

module.exports = pool;