// This file will contain all the routes for cars

const express = require('express');
const Car = require('../model/Cars');

// Create internal router:
const router = express.Router();

// GET - Get all the cars:
router.get('/', (req, res)=>{
    // find() - is a mongoDB command to get all objects
    // exec() -> will run the command in the db. 
    Car.find({}).exec((err, cars) => {
        if (err) console.log(err.message);
        else res.json(cars);
    })
})

// GET - get specific car:
router.get('/:model', (req, res)=>{
    Car.findOne({ model: req.params.model }).exec((err, car) => {
        if (err || car === null) {
            res.status(404);
            res.send("Error..That car was not found!!");
        }
        else {
            res.status(200);
            res.json(car)
        }
    })
})

// POST - Add a new car(object) to the collection
router.post('/add', (req, res) => {
    // Create a new car, and get the data from the request body
    let newCar = new Car();
    
    newCar.CarId = req.body.CarId;
    newCar.model = req.body.model;
    newCar.year = req.body.year;
    newCar.km = req.body.km;
    newCar.city = req.body.city;
    

    newCar.save((err, car)=> {
        if (err){
            res.status(404);
            res.send('Failed saving...');
        }
        else{
            res.status(201);
            res.send('New car was added successfully');
        }
    })
})

// PUT - Update the car's year: 
// params - car's model, body - new year. 
router.put('/update/:CarId', (req, res) => {

    // findOneAndUpdate({ who to update },{ new data }, (err, success))
    Car.findOneAndUpdate(
        { CarId: req.params.CarId }, { $set: {year: req.body.newYear} }, 
        (err, updatedCar) => {
            if(err) {
                res.status(404);
                res.send(`Failed updating car's year...`);
        }else{
            res.status(200);
            res.send(`Car's year was updated successfully`);
        }}
    )
})

// DELETE - delete a car using it's name in params
router.delete('/delete/:CarId', (req, res)=>{
    Car.deleteOne({ CarId: req.params.CarId }).exec((err, car)=>{
        if(err) {
            res.status(404);
            res.send(`Failed deleting car...`);
        }else{
            res.status(200);
            res.send(`Car was deleted successfully`);
        }
    })
})

// export the file
module.exports = router;