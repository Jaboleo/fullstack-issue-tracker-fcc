const router = require('express').Router()
let Issue = require('../models/issue.model');

router.route('/').get((req, res) => {
    Issue.find()
        .then(issues => res.json(issues))
        .catch(err => res.status(400).json(`Error ${err}`))
})

router.route('/:project').get((req, res) => {

    Issue.find({title: req.params.project})
        .then(issue => res.json(issue))
        .catch(err => res.status(400).json(`Error ${err}`))

})

router.route('/add').post((req, res)  => {

    const {title, text, createdBy, assignedTo, statusText} = req.body;
    const newIssue = new Issue({
        title,
        text,
        createdBy,
        assignedTo,
        statusText
    });

    newIssue.save()
    .then(() => res.json("Issue added!"))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/:id').delete((req, res) => {
    Issue.findByIdAndDelete(req.params.id)
    .then(res.json('Issue deleted!'))
    .catch(err => res.status(400).json(`Error ${err}`))
})

router.route('/:id').put((req, res) => {
    Issue.findById(req.params.id)
    .then(issue => {
        issue.title = req.body.title
        issue.text = req.body.text
        issue.createdBy = req.body.createdBy
        issue.assignedTo = req.body.assignedTo
        issue.status = req.body.status
        
        issue.save()
            .then(res.json("Issue updated!"))
            .catch(err => res.status(400).json(`Error ${err}`))
    })
})
module.exports = router;