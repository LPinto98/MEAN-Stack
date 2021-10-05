const dotEnvConfig = require("dotenv");

dotEnvConfig.config();

module.exports = {
    MongoUrl: process.env.MONGO_URL,
    PORT: process.env.PORT
}