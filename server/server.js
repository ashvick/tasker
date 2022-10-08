const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

app.use(cors()) // to allow cross origin requests
app.use(bodyParser.json()) // to convert the request into JSON

// mongoose
//     .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log('MongoDB database Connected...'))
//     .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('Hello World! It\'s test')
})

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))