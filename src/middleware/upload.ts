import multer, { FileFilterCallback } from 'multer';
import {v4} from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'))
    },
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file: Express.Multer.File, callback: FileFilterCallback) {
        if(
            file.mimetype == "image/png" || file.mimetype == "image/jpg"
        ) {
            callback(null, true);
        } else {
            console.log('only jpg and png file supported!');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

export default upload;