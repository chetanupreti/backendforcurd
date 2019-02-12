const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    "Name": String,
    "Email": String,
    "Password": String,
    "Id":String,
    "City":String,
    "PhoneNumber": String,
});
module.exports = mongoose.model('userDetails', userSchema, "users");