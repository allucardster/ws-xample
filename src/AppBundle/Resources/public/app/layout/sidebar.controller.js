angular.module('wsx.layout').controller('SidebarController', SidebarController);

SidebarController.$inject = ['ChannelService']

function SidebarController(ChannelService) {
    /* virtual model */
    var vm = this;
    vm.channels = [];
    vm.status = {
        loading: false
    };

    init();

    function init() {
        vm.status.loading = true;
        return ChannelService.getChannels().then(function(data) {
            vm.channels = data;
            vm.status.loading = false;
            return vm.channels;
        });
    }
}