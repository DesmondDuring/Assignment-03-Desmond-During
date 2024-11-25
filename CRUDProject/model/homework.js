const mongoose = require("mongoose");

// Defines homeworkModel Template
let homeworkModel = mongoose.Schema({
    Subject: String,
    Year: Number,
    Description: String
},
{
    collection:"Homework_Tracking"
});
module.exports =mongoose.model('Homework',homeworkModel);