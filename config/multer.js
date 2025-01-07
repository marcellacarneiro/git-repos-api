const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

const handleMulterError = (err, req, res, next) => {
    if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send('The file exceeded the maximum allowed size of 5 MB.');
        }
        return res.status(500).send('Error processing the file.');
    }
    next();
};

module.exports = { upload, handleMulterError };
