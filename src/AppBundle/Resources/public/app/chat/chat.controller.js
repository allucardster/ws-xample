angular.module('wsx.chat').controller('ChatController', ChatController);

 ChatController.$inject = ['channelSlug', 'ChatService'];

function ChatController(channelSlug, ChatService) {
    /* virtual model */
    var vm = this;
    vm.channel = ChatService.getChannelBySlug(channelSlug);
    vm.message = '';
    vm.sendMessage = sendMessage;

    function sendMessage() {
        vm.channel.addMessage(vm.message);
        //vm.channel.sendMessage(vm.message);
    }
}