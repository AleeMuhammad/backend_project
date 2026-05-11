import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname); // but the orriginal name is not recommended as it may cause conflicts if two files with the same name are uploaded. You can use a unique identifier or timestamp to ensure that each file has a unique name.
    console.log(file)
  },
});

export const upload = multer({ storage: storage });
