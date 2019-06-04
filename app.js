const path = require('path')


const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const feedRoutes = require('./routes/feed')

const MONGODB_URI =
  'mongodb+srv://ttyagi:123wsx@nodepracticemax-hjdhm.mongodb.net/messages';


const app = express();

//app.use(bodyParser.urlencoded()); //x-www-form-url-encoded <form>
app.use(bodyParser.json()) //application/json

//make image folder public
app.use('/images', express.static(path.join(__dirname,'images')))

app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes)

mongoose.connect(MONGODB_URI).then(result => {
    app.listen(8080)
}).catch(err => console.log('error'))
