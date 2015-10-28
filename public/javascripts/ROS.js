/* -------------------- ROS ------------------ */
var ros = new ROSLIB.Ros();
  
// If there is an error on the backend, an 'error' emit will be emitted.
ros.on('error', function(error) {
    console.log(error);
});
  
// Find out exactly when we made a connection with ROSBridge
ros.on('connection', function() {
    console.log('Connection made!');
});

ros.on('close', function() {
    console.log('Connection closed.');
});
  
// Create a connection to the rosbridge WebSocket server. 
ros.connect('ws://localhost:9090');
  
//Subscribing to a Topic 
//----------------------
// Like when publishing a topic, we first create a Topic object with details of the topic's name
// and message type. Note that we can call publish or subscribe on the same topic object.
var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/db',
    messageType : 'std_msgs/String'
});
  
// Then we add a callback to be called every time a message is published on this topic.
//Every time that a message is published, I call loadDashboard which just calls a GET 
//request to the database and updates the front end accordingly. 
listener.subscribe(function(message) {
    loadDashboard();
// If desired, we can unsubscribe from the topic as well.
//listener.unsubscribe();
});