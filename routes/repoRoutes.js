const express = require('express');
const router = express.Router();
const { getRepos, getReposById, createRepo, updateRepo, deletedRepo } = require('../controllers/repoController');
const upload = require('../config/multer');

router.get('/', getRepos);
router.get('/:id', getReposById);
router.post(
    '/create',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'demo', maxCount: 1 },
    ]),
    createRepo
);
router.put(
    '/update/:id',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'demo', maxCount: 1 },
    ]),
    updateRepo
);
router.delete('/delete/:id', deletedRepo);

module.exports = router;
