const express = require('express');
// mongoose:
const mongoose = require('mongoose');
// import the router:
const cars = require('../my-app/routes/CarsRoute');


const app = express();
const PORT = 3000;

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// use the router for cars:
app.use('/cars', cars);

// Connect to MongoDB using mongoose - to Cars database. 
mongoose.connect('mongodb://localhost:27017/Cars', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));