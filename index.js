import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {errorHandler} from './middlewares/errorHandler.js'
import router from "./routes/baseRouter.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);
app.use(express.static("image-uploads"));

// Custom error handling middleware
app.use(errorHandler);

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
