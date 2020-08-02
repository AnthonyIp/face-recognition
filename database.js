const database = {
    users: [
        {
            id      : '123',
            name    : 'John',
            email   : 'john@gmail.com',
            password: 'cookies',
            entries : 0,
            joined  : new Date()
        },
        {
            id      : '456',
            name    : 'Sally',
            email   : 'sally@gmail.com',
            password: 'password',
            entries : 0,
            joined  : new Date()
        },
    ]
}

module.exports = database;
