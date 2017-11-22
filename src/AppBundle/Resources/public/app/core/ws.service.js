angular.module('wsx.core').service('WebSocketService', WebSocketService);

WebSocketService.$inject = ['$q']

function WebSocketService($q)
{
    var that = this;
    this.webSocketUri = "ws://wsxample.dev:8025";
    this.connection = null;
    this.connect = connect;

    function connect()
    {
        var deferred = $q.defer();
        
        if (!that.connection) {
            this.connection = WS.connect(that.webSocketUri);
        }

        this.connection.on("socket/connect", function(session) {
            deferred.resolve(session);
        });
        
        this.connection.on("socket/disconnect", function(error) {
            deferred.reject(error);
        });
        return deferred.promise
    }
}
