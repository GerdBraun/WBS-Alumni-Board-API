import express from "express";
import {
  createCompany,
  getCompanies,
} from "../controllers/companyController.js";
import { uploadCompanyLogo } from "../middlewares/upload-image.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import cloudUploader from "../middlewares/cloudUploader.js";

const companyRouter = express.Router();

companyRouter
  .route("/")
  .get(getCompanies)
  .post(uploadCompanyLogo.single("file"), cloudUploader, createCompany);

export default companyRouter;
