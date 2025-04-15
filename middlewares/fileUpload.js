import multer from 'multer';
import fs from 'fs';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads/recipesPhotos/')) {
      fs.mkdirSync('uploads/recipesPhotos/', { recursive: true });
    }

    cb(null, 'uploads/recipesPhotos/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + file.originalname;
    req.customFile = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
