angular.module('wsx.core').factory('ChannelService', ChannelService);

ChannelService.$inject = ['$http'];

function ChannelService($http) {
    return {
        getChannels: getChannels
    };

    function getChannels(page) {
        page = page || 1;
        var url = ['/api/channel/list', page].join('/');
        return $http.get(url)
            .then(getChannelsComplete)
            .catch(getChannelsFailed)
        ;

        function getChannelsComplete(response) {
            return response.data;
        }

        function getChannelsFailed(error) {
            console.log('XHR Failed for getChannels. ' + error.data);
        }
    }
}