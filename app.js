import express from 'express';
import { connectMongoDb } from "./src/config/db/mongoDbConfig.js";
import { createInitialData } from "./src/config/db/initialData.js"
import checkToken from './src/config/auth/checkToken.js';
import { connectRabbitMq } from "./src/config/rabbitmq/rabbitConfig.js"

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

connectMongoDb();
createInitialData();
connectRabbitMq();

app.use(checkToken)

app.get('/api/status', async (req, res) => {

    return res.status(200).json({
        service: "sales-API",
        status: "up",
        httpStatus: 200,
    });
});



app.listen(PORT, ()=> {
    console.info(`Server started sucessfully at port : ${PORT}`);

});