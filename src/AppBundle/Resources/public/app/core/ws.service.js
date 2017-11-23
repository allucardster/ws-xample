angular.module('wsx.core').service('WebSocketService', WebSocketService);

WebSocketService.$inject = ['$q']

function WebSocketService($q)
{
    var that = this;
    this.webSocketUri = "ws://wsxample.dev:8025";
    this.connection = null;
    this.session = null;
    this.error = null;
    this.connect = connect;

    function connect()
    {
        var deferred = $q.defer();
        
        if (that.connection) {
            deferred.resolve(that.session);
        } else {
            that.connection = WS.connect(that.webSocketUri);

            that.connection.on("socket/connect", function(session) {
                that.session = session;
                deferred.resolve(session);
            });
            
            that.connection.on("socket/disconnect", function(error) {
                that.error = error;
                deferred.reject(error);
            });
        }
        return deferred.promise
    }
}
