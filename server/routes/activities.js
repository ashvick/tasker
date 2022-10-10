const router = require('express').Router();
const authenticateToken = require('../middlewares/auth.middleware');
let Activity = require('../models/activity.model');

router.use(authenticateToken);

router.route('/').get(async (req, res) => {
    Activity.find({ userId: req.user.id })
        .then(activities => res.json(activities))
        .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
    const userId   = req.user.id;
    const title    = req.body.title;
    const value    = Number(req.body.value);
    const duration = Number(req.body.duration);
    const useful   = Boolean(req.body.useful);
    const date     = new Date(req.body.date);

    const newActivity = new Activity({
        userId,
        title,
        value,
        duration,
        useful,
        date,
    });

    try {
        const activity = await newActivity.save();
        if (!activity) throw new Error('Something went wrong saving the Activity');
        res.status(200).json(activity);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.route('/:date').get((req, res) => {
    console.log(req.params);
    const date = new Date(req.params.date);
    const [endDate]   = new Date(date.setDate(date.getDate() + 1)).toISOString().split('T');
    Activity.find({
        userId: req.user.id,
        date: {
            $gte: req.params.date,
            $lt: endDate,
        }
    })
        .then(activities => res.json(activities))
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