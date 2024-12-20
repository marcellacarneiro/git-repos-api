const mongoose = require('mongoose');
const repoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    demo: {
        data: Buffer,
        contentType: String,
    },
    languages: {
        type: [String],
        default: [],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    deployUrl: {
        type: String,
    },
    githubUrl: {
        type: String,
    },
    figmaUrl: {
        type: String,
    },
});

module.exports = mongoose.model('Repo', repoSchema);
