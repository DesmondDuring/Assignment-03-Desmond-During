const mongoose = require("mongoose");

let homeworkModel = mongoose.Schema({
    Subject: String,
    Year: Number,
    Description: String
},
{
    collection:"Homework_Tracking"
});
module.exports =mongoose.model('Homework',homeworkModel);