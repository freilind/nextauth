const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb: {
                    username: 'username',
                    password: 'password',
                    clustername: 'clustername',
                    domain: 'domain',
                    database: 'database'
                }
            }
        };
    }
    return{};
};

