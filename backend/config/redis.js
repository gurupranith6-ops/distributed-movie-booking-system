const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }
});

const connectRedis = async () => {

    try {

        console.log(
            'REDIS URL:',
            process.env.REDIS_URL
        );

        await redisClient.connect();

        console.log(
            'Redis Connected'
        );

    } catch (error) {

        console.log(
            'Redis Error:',
            error
        );
    }
};

module.exports = {
    redisClient,
    connectRedis
};