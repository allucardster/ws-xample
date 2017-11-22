angular.module('wsx.core').service('WebSocketService', WebSocketService);

WebSocketService.$inject = ['$q']

function WebSocketService($q)
{
    var that = this;
    this.connection = WS.connect("ws://127.0.0.1:8025");
    this.session = null;
    this.subscribe = subscribe;
    this.unSubscribe = unSubscribe;
    this.publish = publish;

    function subscribe(topic, callback) {
        var deferred = $q.defer();
        callback = callback || function(uri, payload) {};
        if(that.session) {
            return that.session.subscribe(channelTopic, callback);
        } else {
            deferred.reject('Web socket session is null');
        }
        return deferred.promise;
    }

    function unSubscribe(topic) {
        var deferred = $q.defer();
        if(that.session) {
            return that.session.unsubscribe(topic);
        } else {
            deferred.reject('Web socket session is null');
        }
        return deferred.promise;
    }

    function publish(topic, message) {
        var deferred = $q.defer();
        if(that.session) {
            return that.session.publish(topic, message);
        } else {
            deferred.reject('Web socket session is null');
        }
        return deferred.promise;
    }

    this.connection.on("socket/connect", function(session) {
        that.session = session;
        that.session.defer = $q.defer;
    });
    
    this.connection.on("socket/disconnect", function(error) {
        console.log("Disconnected for " + error.reason + " with code " + error.code);
    });
}
