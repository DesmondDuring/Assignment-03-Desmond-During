const mongoose = require("mongoose");

let homeworkModel = mongoose.Schema({
    Subject: String,
    Year: Number,
    Description: String
},
{
    collection:"Electives"
});
module.exports =mongoose.model('Homework',homeworkModel);