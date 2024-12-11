import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {errorHandler} from './middleware/errorHandler.js'
import companyRouter from "./routes/companyRouter.js";

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS for frontend requests
app.use(cors());

app.use(express.json());

app.use("/companies", companyRouter);


// Custom error handling middleware
app.use(errorHandler);

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
