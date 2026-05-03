import express from "express";
import dotenv from "dotenv";
import demoroute from "./routes/demo.js"
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/v1/users", demoroute);


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected")
}).catch((error) => {
    console.log(error)
})

app.listen(process.env.PORT, () => {
    console.log(`running on ${process.env.PORT}`)
})


