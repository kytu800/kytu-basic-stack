var sslEnabled = false;
var path = require('path');

module.exports = {

    port: (process.env.PORT || 3000),

    model: {
        mysql: {
            database: "DATABASE",
            account: "ACCOUNT",
            password: "PASSWORD",
            options: {
                host: "127.0.0.1",
                logging: false
            }
        },
        mongo: {
            database: "DATABASE",
            options: {
                host: "127.0.0.1"
            }
        }
    },

    key: {
        cookie: "blablabla",
        session: "blablabla2"
    },

    session: {
        redis: {
            host: 'localhost',
            port: 6379
        }
    },

    cdn: {
        publicDir: path.join(path.dirname(__dirname), 'public'),
        viewsDir: path.join(path.dirname(__dirname), 'views'),
        domain: 'example.s3.amazonaws.com',
        bucket: 'example',
        key: 'AKIAIERJP4URQJWXYAKG',
        secret: '',
        hostname: 'localhost',
        port: (sslEnabled ? 443 : 3000),
        ssl: sslEnabled,
        production: true
    }
};