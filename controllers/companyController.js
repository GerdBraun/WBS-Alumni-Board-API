import { Company } from "../db/db.js";

export const createCompany = async (req, res) => {
  try {
    const {
      body: { name, logo },
    } = req;
    if (!name) return res.status(400).json({ error: "name is required" });
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateCompanies = async (req, res) => {};
export const deleteCompanies = async (req, res) => {};
