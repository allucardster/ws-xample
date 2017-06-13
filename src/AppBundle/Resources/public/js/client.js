var webSocket = WS.connect("ws://127.0.0.1:8025");

webSocket.on("socket/connect", function(session){
    //session is an Autobahn JS WAMP session.
    console.log("Successfully Connected!");

    //the callback function in "subscribe" is called everytime an event is published in that channel.
    session.subscribe("app/channel_xample", function(uri, payload){
        console.log("Received message", payload.msg);
    });

    session.publish("app/channel_xample", "This is a message!");
});

webSocket.on("socket/disconnect", function(error){
    //error provides us with some insight into the disconnection: error.reason and error.code
    console.log("Disconnected for " + error.reason + " with code " + error.code);
});
