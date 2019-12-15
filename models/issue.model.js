const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    createdBy: {type: String, required:true},
    assignedTo: {type: String},
    statusText: {type: String}
})

const Issue = mongoose.model('Issue', issueSchema)

module.exports = Issue