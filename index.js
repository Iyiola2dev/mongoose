import express from "express"
import dotenv from "dotenv"
import dbConnection from "./db/conn.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors"
import { OTPgenrator } from "./lib/OTPgenerator.js";


dotenv.config()
await dbConnection()

const app = express();
const Port = 3000;
app.use(express.json())
app.use(cors())
app.use("/api/v1/user", userRouter)


app.listen(Port, ()=>{
    console.log(`Server is running on Port http://localhost:${Port}`);
})
