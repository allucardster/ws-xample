angular.module('wsx.chat').controller('ChatController', ChatController);

ChatController.$inject = ['$scope', 'channelSlug', 'WebSocketService'];

function ChatController($scope, channelSlug, WebSocketService) {
    /* virtual model */
    var vm = this;
    vm.channel = null;
    vm.messages = [];
    vm.message = '';
    vm.webSocketSession = null;
    vm.sendMessage = sendMessage;

    init();

    function getChannelBySlug(slug) {
        var channel = {
            id: 1,
            name: slug,
            slug: slug
        };
        return channel;
    }

    function getTopicBySlug(slug) {
        return ['app/chat', slug, 'channel'].join('/');
    }

    function init() {
        vm.channel = getChannelBySlug(channelSlug);

        function subscribeHandler(uri, payload) {
            console.log('Received message: ', uri, payload);
            vm.messages.push(payload.msg);
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

        WebSocketService.connect().then(connectionSuccessHandler, connectionFailuerHandler);
    }

    function sendMessage() {
        vm.webSocketSession.publish(getTopicBySlug(vm.channel.slug), vm.message);
        vm.message = '';
    }
}