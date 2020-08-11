const express = require('express')

const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//Middlewares
app.use(cors())
app.use(bodyParser.json())

// Import Routes
const postRoute = require('./routes/posts')
const authRoute = require('./routes/auth');
const { populate } = require('./models/Post');

app.use('/api/post', postRoute)
app.use('/api/user', authRoute)

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Mongo connection success !'))
    .catch(() => console.log('Mongo connection failed !'));

app.listen(3000)