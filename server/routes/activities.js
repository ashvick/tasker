const router = require('express').Router();
let Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const title    = req.body.title;
    const value    = Number(req.body.value);
    const duration = Number(req.body.duration);
    const date     = Date.parse(req.body.date);

    const newActivity = new Activity({
        username,
        title,
        value,
        duration,
        date,
    });

    newActivity.save()
        .then(() => res.json('Activity added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Activity.findById(req.params.id)
        .then(activity => res.json(activity))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Activity.findByIdAndDelete(req.params.id)
        .then(activity => res.json('Activity deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Activity.findById(req.params.id)
        .then(activity => {
            activity.username = req.body.username;
            activity.title    = req.body.title;
            activity.value    = Number(req.body.value);
            activity.duration = Number(req.body.duration);
            activity.date     = Date.parse(req.body.date);

            activity.save()
                .then(activity => res.json('Activity updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;