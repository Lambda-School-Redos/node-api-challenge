const express = require('express');
const projects = require('./helpers/projectModel.js');
const router = express.Router();

router.get('/:id', (req, res) => {
    projects
        .get(req.params.id)
        .then(project => {
            project ?
            res.status(200).json(project) :
            res.status(404).json({ Error: "Project not found"}); 
        })
        .catch(error => {
            res.status(500).json({ Error: error});
        });
});

router.post('/', (req, res) => {
    projects
        .insert(req.body)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(error => {
            res.status(500).json({ Error: error })
        });
});

router.delete('/:id', (req, res) => {
    projects
        .remove(req.params.id)
        .then(count => {
            count ?
            res.status(200).json({ message: "The project has been deleted"}) :
            res.status(404).json({ message: "Project with that ID not found"});
        })
        .catch(error => {
            res.status(500).json({ Error: error });
        });

});

router.put('/:id', (req, res) => {
    projects
        .update(req.params.id, req.body)
        .then(project => {
            project ?
            res.status(200).json(project) :
            res.status(404).json({ message: "ID not found" });
        })
        .catch(error => {
            res.status(500).json({ Error: error });
        });
});

router.get('/actions/:id', (req, res) => {
    projects
        .getProjectActions(req.params.id)
        .then(actions => {
            actions ?
            res.status(200).json(actions) :
            res.status(404).json({ message: "ID not found" });
        })
        .catch(error => {
            res.status(500).json({ Error: error });
        });
});


module.exports = router;