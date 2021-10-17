const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name:String,
    hours:Number,
    tag : String,
    activity: String,
    date: Date

})

module.exports = mongoose.model('User', userSchema);