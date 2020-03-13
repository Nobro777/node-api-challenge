const express = require("express");
const projects = require("../data/helpers/projectModel.js");

const router = express.Router();

router.get('/', (req, res) => {
    projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => console.log(error))
})

router.get('/:id', validateProjectId, (req, res) => {
    projects.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => console.log(error))
})

router.get('/:id/actions', (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: "could not load actions"}))
});

router.post('/', (req, res) => {
    projects.insert(req.body)
    .then(post => {
        res.status(200).json(post)
    })
});

router.delete('/:id', (req, res) => {
    projects.remove(req.params.id)
    .then(item => {
        res.status(200).json({
            message: "item deleted :",
        })
    })
    .catch(error => console.log(error))
})

router.put('/:id', validateProjectId, (req, res) => {
    projects.update(req.params.id, req.body)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(error => console.log(error))
})

function validateProjectId(req, res, next){
    projects.get(req.params.id)
    .then(project => {
        if (project){
            req.project = project;
            next();
        }
        else {
            res.status(400).json({
                error: "400 error- invalid project ID"
            })
        }
    })
    .catch(error => console.log(error))
}

module.exports = router;