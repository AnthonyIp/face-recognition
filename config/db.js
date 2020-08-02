const knex = require('knex')({
    client    : 'pg',
    connection: {
        host    : '127.0.0.1',
        user    : 'Anthony',
        password: '',
        database: 'smart-brain'
    }
});

module.exports = knex;
