angular.module('wsx.chat').controller('ChatController', ChatController);

ChatController.$inject = ['$scope', 'slug', 'WebSocketService'];

function ChatController($scope, slug, WebSocketService) {
    /* virtual model */
    var vm = this;
    vm.channel = {
        slug: slug
    };
    vm.messages = [];
    vm.message = '';
    vm.webSocketSession = null;
    vm.sendMessage = sendMessage;

    init();

    function getTopicBySlug(slug) {
        return ['app/chat', slug, 'channel'].join('/');
    }

    function init() {
        WebSocketService.connect().then(connectionSuccessHandler, connectionFailuerHandler);

        function subscribeHandler(uri, payload) {
            console.log('Received message: ', uri, payload);
            if(payload.type == 'message') {
                vm.messages.push(payload);
            }
            $scope.$apply();
        }
        
        function connectionSuccessHandler(webSocketSession) {
            console.log('Websocket server connection successfully established');
            vm.webSocketSession = webSocketSession;
            vm.webSocketSession.subscribe(getTopicBySlug(vm.channel.slug), subscribeHandler);
        }

        function connectionFailuerHandler(error) {
            console.log('Websocket server connection failed', error);
        }
    }

    function sendMessage() {
        vm.webSocketSession.publish(getTopicBySlug(vm.channel.slug), vm.message);
        vm.message = '';
    }
}