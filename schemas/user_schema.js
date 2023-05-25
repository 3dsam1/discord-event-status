const mongoose = require("mongoose")


const add_user_schema = new mongoose.Schema({

   discord_id: {type: String, require: true},
   connected_time: { type: Number, require: true, unique: false},
   time_connected: {type: Number, require: true, unique: false},
   event_id: {type: Number, require: true, unique: false}

}, {
    versionKey: false
})


const model = mongoose.model("user", add_user_schema);

module.exports = model

