const express = require('express');
const actions = require('./helpers/actionModel.js');
const router = express.Router();

router.get('/:id', (req, res) => {
    actions
        .get(req.params.id)
        .then(action => {
            action ?
            res.status(200).json(action) :
            res.status(404).json({ Error: "Action not found"}); 
        })
        .catch(error => {
            res.status(500).json({ Error: error});
        });
});

router.post('/', (req, res) => {
    actions
        .insert(req.body)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(error => {
            res.status(500).json({ Error: error })
        });
});

router.delete('/:id', (req, res) => {
    actions
        .remove(req.params.id)
        .then(count => {
            count ?
            res.status(200).json({ message: "The action has been deleted"}) :
            res.status(404).json({ message: "Action with that ID not found"});
        })
        .catch(error => {
            res.status(500).json({ Error: error });
        });

});

router.put('/:id', (req, res) => {
    actions
        .update(req.params.id, req.body)
        .then(action => {
            action ?
            res.status(200).json(action) :
            res.status(404).json({ message: "ID not found" });
        })
        .catch(error => {
            res.status(500).json({ Error: error });
        });
});


module.exports = router;