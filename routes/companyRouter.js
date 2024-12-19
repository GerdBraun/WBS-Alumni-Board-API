import express from "express";
import {
  createCompany,
  getCompanies,
} from "../controllers/companyController.js";
import { uploadCompanyLogo } from "../middlewares/upload-image.js";

const companyRouter = express.Router();

companyRouter
  .route("/")
  .get(getCompanies)
  .post(uploadCompanyLogo.single("file"), createCompany);

export default companyRouter;
