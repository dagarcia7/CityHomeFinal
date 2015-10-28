var mongoose = require('mongoose');
var objectSchema = require('../schemas/objects');

/*
Defining the Object Model to be used in the app. This model will use the Object Schema.
*/
var Object = mongoose.model('Object', objectSchema);
module.exports = Object;

