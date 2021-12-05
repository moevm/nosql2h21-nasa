const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: String,
    id: Number,
    nametype: String,
    recclass: String,
    mass: Number,
    fall: String,
    year: Number,
    reclat: Number,
    reclong: Number,
    GeoLocation: String,
});

const landmetsModel = model("landmets", schema)
// var json = require('./../../data/source/Meteorite_Landings.json');
// landmetsModel.insertMany(json, function(err,result) {
//    if (err) {
//      console.log("Плохо", err)
//    } else {
//      console.log("Хорошо")
//    }
// });
module.exports = landmetsModel;
