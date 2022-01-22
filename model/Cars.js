// Create the model for each object:
const mongoose = require('mongoose');

// Schema - collection
let CarSchema = new mongoose.Schema(
    {
        CarId : Number,
        model: String, 
        year: Number, 
        km : Number,
        city: String
    },
    {
        strict: false
    }
)

// Use model to export the Schema:
const CarModel = mongoose.model("CarSchema", CarSchema);

// Export the model outside the file:
module.exports = CarModel;