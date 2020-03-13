const express = require("express");
const actions = require("../data/helpers/actionModel.js");


const router = express.Router();

router.get('/', (req, res) => {
    actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving actions"
        })
    })
})

router.get('/:id', (req, res) => {
    actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving action"
        })
    })
})



router.post('/:id', (req, res) => {
    actions.insert(req.body)
    .then(post => {
        if (!post.project_id || post.project_id < 0 || !post.description || post.description < 0 || !post.notes || post.notes < 0 ){
            res.status(400).json({
                message: "Error adding action-- Must include a VALID ID(string) + Description(string) + Notes(string)!"
            })
        } else if (post.description.length > 128) {
            res.status(400).json({
                message: "This field must be under 128 characters"
            })
        } else {
            res.status(201).json({
                message: "Created action successfully"
            })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            error: "Must include a VALID 'project_id' + 'description' + 'notes'" 
        })
    })
})

router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
    .then(item => {
        res.status(200).json({
            message: "item deleted successfully"
        })
        console.log("deleted action successfully :", item)
    })
})

router.put('/:id', (req, res) => {
    actions.update(req.params.id, req.body)
    .then(update => {
        res.status(200).json({
            message: "item edited successfully :"
        })
        console.log("updated successfuly :", update)
    })
    .catch(error => console.log(error))
})

module.exports = router;
