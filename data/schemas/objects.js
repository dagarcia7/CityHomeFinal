var mongoose = require('mongoose');

/*
Defining the Object Schema. Schemas define the rules for storing
information into the database. This Schema will define how the 
Object collection will be organized. Out of the different criteria
needed to define an object, the only non-intuitive one is the identifier. 
The identifier will be a concatenation of address + name + type where address
is ip-address + port
*/

var objectSchema = new mongoose.Schema({
    ip_address: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    }, 
    state: {
        type: String,
        required: true
    },
    lock: {
        type: Number, 
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = objectSchema;