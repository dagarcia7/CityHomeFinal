var express = require('express');
var router = express.Router();
var ObjectDB = require('../data/models/objects');
var Response = require('../utils/response');

//NOTE: In every http request, there is a parameter that says 
//Response.restrict. This is something that makes sure that the API
//Can't be accessed without logging in as a user first. If no user login functionality
//is needed, all that is needed is to remove this parameter from the http requests. 

//POST a new object to the database
/* Required fields: 
    IP Address -> String
    Port -> Integer
    Name -> String 
    Type -> String
    State -> String
    Lock -> Boolean
*/

router.post('/', Response.restrict, function(req, res) {
    var ip = req.body.ip_address;
    var port = req.body.port;
    var name = req.body.name;
    var type = req.body.type;
    var state = req.body.state;
    var lock = req.body.lock;
    
    var address = ip.concat(port.toString());
    var identifier = address.concat(name, type);
    var time = new Date();
    
    var newObject = new ObjectDB({
        ip_address: ip,
        port: port,
        address: address,
        name: name,
        identifier: identifier,
        type: type,
        state: state,
        lock: lock,
        time: time
    });
    
    newObject.save(function(err, object) {
        if (err) {
            Response.sendErr(res, 500, 'An unknown error occurred.');
        } else {
            Response.sendSuccess(res, {
                object: object
            });
        }
    });
});

//GET all objects stored in the database
router.get('/', Response.restrict, function(req, res) {

    ObjectDB.find(req.query, function(err, objects) {
        if (err) {
            Response.sendErr(res, 500, 'An unknown error occurred.');
        } else {
            Response.sendSuccess(res, {
                objects: objects
            });
        }
    }).sort({name: 1});
});

//params must be the six fields that are required for a post
router.put('/:objectId', Response.restrict, function(req, res) {
    var objectId = req.params.objectId;
    
    if (Object.keys(req.query).length != 6) {
        Response.sendErr(res, 404, 'Wrong number of arguments');
    } else {
        var revised_query = req.query;
        var new_object_address = req.query.ip_address.concat(req.query.port.toString());
        var new_object_identifier = new_object_address.concat(req.query.name, req.query.type);
        
        revised_query.address = new_object_address;
        revised_query.identifier = new_object_identifier; 

        ObjectDB.findOneAndUpdate({
            identifier: objectId
        }, {
            $set: revised_query
        }, {new: true}, function(err, object) {
            if (err) {
                Response.sendErr(res, 500, 'An unknown error occurred.');
            }
            if (!object) {
                Response.sendErr(res, 404, 'Object not found')
            } else {
                Response.sendSuccess(res, {
                    object: object
                });
            }
        });
    }
});

module.exports = router;