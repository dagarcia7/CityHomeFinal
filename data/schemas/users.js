var mongoose = require('mongoose'); 

/*
* Defining the User Schema.
* This schema will define how the User collection will be organized.
* This is used when want a login/logout system in order to use the
* backend API. 
*/

var UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }
});

module.exports = UserSchema; 