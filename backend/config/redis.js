const { createClient } = require("redis");


// Create Redis Client
const redisClient = createClient({
    url: "redis://127.0.0.1:6379"
});


// Redis Error Handling
redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});


// Connect Redis
const connectRedis = async () => {

    try {

        await redisClient.connect();

        console.log("Redis Connected");

    } catch (error) {

        console.log(
            "Redis Connection Failed:",
            error.message
        );
    }
};


module.exports = {
    redisClient,
    connectRedis
};