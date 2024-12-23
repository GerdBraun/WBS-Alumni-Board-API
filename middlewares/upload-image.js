import multer from "multer";
import path from "path";

//const userAvatar = multer.memoryStorage();

const companyLogo = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["jpeg", "jpg", "png", "gif"];

  if (allowedTypes.includes(file.mimetype.split("/")[1])) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

// export const uploadUserAvatar = multer({
//   storage: userAvatar,
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 },
// });

export const uploadCompanyLogo = multer({
  storage: companyLogo,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
