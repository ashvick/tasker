const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express()

app.use(cors()) // to allow cross origin requests
app.use(express.json()) // to convert the request into JSON

mongoose
    .connect(process.env.MONGO_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => console.log(err))

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

const authRouter       = require('./routes/auth');
const usersRouter      = require('./routes/users');
const activitiesRouter = require('./routes/activities');

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.get('/api/test', (req, res) => {
    console.log('/test request');
    res.send('Hello World! It\'s test. New version hey')
})

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))