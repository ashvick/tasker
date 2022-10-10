const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: Number, required: true },
    duration: { type: Number, required: true },
    useful: { type: Boolean, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;