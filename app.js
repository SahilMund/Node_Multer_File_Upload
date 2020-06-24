const express = require("express");
const multer = require("multer");
//const ejs = require('ejs');
const { mongoURI } = require('./keys')
const path = require('path');

require("./router/route");


mongoose
    .connect(mongoURI, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log("Mondodb Connected...."))
    .catch(err => console.error(err));



//use mode //model register 

require('./models/user')

// Use routes // route register

app.use('/', require('./router/route'))

//init app
const app = express();

//EJS
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 4000;

app.listen(port,
    () => console.log(`Listening on port ${port}...`));