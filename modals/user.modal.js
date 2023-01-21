const mongoose = require('mongoose');

const UserModal = mongoose.model('calUsers', {
    name : String,
    email :String,
    password:String
})

module.exports = { UserModal};