import { Company } from "../db.js";

export const createCompany = async (req, res) => {
  try {
    const logo = req.file ? req.cloudinaryURL : null;
    const {
      body: { name },
    } = req;
    console.log(req.body, logo);
    if (!name) return res.status(400).json({ error: "name is required" });

    // prevent duplicate company names
    const test = await Company.findOne({ where: { name } });
    if (test) return res.status(400).json({ error: "company already exists" });

    const company = await Company.create({ name, logo });
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
