import express from "express";
import { createCompany, getCompanies } from "../controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.route("/").get(getCompanies).post(createCompany);

export default companyRouter;