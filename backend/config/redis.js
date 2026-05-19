const redis = require('redis');

const redisClient =
    redis.createClient({
        url: process.env.REDIS_URL
    });

redisClient.connect();

redisClient.on(
    'connect',
    () => {
        console.log(
            'Redis Connected'
        );
    }
);

redisClient.on(
    'error',
    (err) => {
        console.log(
            'Redis Error:',
            err
        );
    }
);

module.exports = redisClient;