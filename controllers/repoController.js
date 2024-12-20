const Repo = require('../models/Repo.js');
const path = require('path');

exports.getRepos = async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 9;

        const totalRepos = await Repo.countDocuments();
        const totalPages = Math.ceil(totalRepos / limit);
        const repos = await Repo.find().select('-image -demo').skip(offset).limit(limit);

        return res.status(200).json({
            totalRepos,
            totalPages,
            offset,
            limit,
            currentPage: Math.floor(offset / limit) + 1,
            data: repos
        })

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

exports.getReposById = async (req, res) => {
    const { id } = req.params;
    try {
        const repo = await Repo.findById(id);
        if (!repo) {
            return res.status(404).json({ message: 'Repository not found.' });
        }
        return res.status(200).json(repo);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

exports.createRepo = async (req, res) => {
    try {
        const { name, description, languages, date, deployUrl, githubUrl, figmaUrl } = req.body;
        let image = null;
        let demo = null;

        if (req.files['image']) {
            image = {
                data: req.files['image'][0].buffer,
                contentType: req.files['image'][0].mimetype
            };
        }

        if (req.files['demo']) {
            demo = {
                data: req.files['demo'][0].buffer,
                contentType: req.files['demo'][0].mimetype
            };
        }

        const languagesArray = languages.split(',').map(lang => lang.trim());

        const newRepo = new Repo({
            name,
            description,
            image,
            demo,
            languages: languagesArray,
            date,
            deployUrl,
            githubUrl,
            figmaUrl,
        });
        await newRepo.save();
        return res.status(201).json(newRepo);
    } catch (e) {
        return res.status(500).json({ message: 'Could not create repository' });
    }
};

exports.updateRepo = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    let image = null;
    let demo = null;

    if (req.files) {
        if (req.files['image']) {
            image = {
                data: req.files['image'][0].buffer,
                contentType: req.files['image'][0].mimetype,
            };
        }

        if (req.files['demo']) {
            demo = {
                data: req.files['demo'][0].buffer,
                contentType: req.files['demo'][0].mimetype,
            };
        }
    }

    if (image) data.image = image;
    if (demo) data.demo = demo;

    if (data.languages) {
        const languagesArray = data.languages.split(',').map(lang => lang.trim());
        data.languages = languagesArray;
    }
    
    try {
        const updatedRepo = await Repo.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!updatedRepo) {
            return res.status(404).json({ message: 'Repository not found.' });
        }

        return res.status(200).json(updatedRepo);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

exports.deletedRepo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRepo = await Repo.findByIdAndDelete(id);
        if (!deletedRepo) {
            return res.status(404).json({ message: 'Repository not found.' });
        }
        return res.status(200).json({ message: 'Repository deleted successfully.' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};
