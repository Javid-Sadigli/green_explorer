// Library for image upload
const multer = require('multer');

// We determine the image place in project folder
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/data/images/');
    },
    filename : (req, file, cb) => {
        const title = req.body.title; 
        cb(null, req.user.username + '-' + title + '.png');
    }
});
const upload = multer({
    storage : storage
}); 

module.exports.upload = upload;