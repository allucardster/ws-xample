angular.module('wsx.layout').controller('SidebarController', SidebarController);

SidebarController.$inject = ['ChatService'];

function SidebarController(ChatService) {
    /* virtual model */
    var vm = this;
    ChatService.loadChannels([
        {
            id: 1,
            name: 'general',
            slug: 'general'
        }
    ]);
}