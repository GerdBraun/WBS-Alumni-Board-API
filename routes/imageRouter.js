import express from "express";

import {
  uploadUserAvatar,
  uploadCompanyLogo,
} from "../middlewares/upload-image.js";

const router = express.Router();

router
  .route("/useravatar")
  .post(uploadUserAvatar.single("file"), (req, res) => {
    console.log("the req.body", JSON.stringify(req.file.filename));
    res.send({
      location: `http://localhost:3000/${req.file.filename}`,
    });
  });

router
  .route("/companylogo")
  .post(uploadCompanyLogo.single("file"), (req, res) => {
    console.log("the req.body", JSON.stringify(req.file.filename));
    res.send({
      location: `http://localhost:3000/${req.file.filename}`,
    });
  });

export default router;
