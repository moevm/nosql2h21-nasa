const { Schema, model } = require("mongoose");

const schema = new Schema({
    full_name: String,
    pha: String,
    diameter: Number,
    q: Number,
    ad: Number,
    first_obs: Date,
    last_obs: Date
});
const asteroidsModel = model("asteroids", schema)
// var json = require('./../../data/source/neos.json');
// asteroidsModel.insertMany(json, function(err,result) {
//    if (err) {
//      console.log("Плохо2", err)
//    } else {
//      console.log("Хорошо2")
//    }
// });
module.exports = asteroidsModel;
