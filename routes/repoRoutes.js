const express = require('express');
const router = express.Router();
const { getRepos, getReposById, createRepo, updateRepo, deletedRepo } = require('../controllers/repoController');
const { upload, handleMulterError } = require('../config/multer');

router.get('/', getRepos);
router.get('/:id', getReposById);
router.post(
    '/create',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'demo', maxCount: 1 },
    ]),
    handleMulterError,
    createRepo
);
router.put(
    '/update/:id',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'demo', maxCount: 1 },
    ]),
    handleMulterError,
    updateRepo
);
router.delete('/delete/:id', deletedRepo);

module.exports = router;
