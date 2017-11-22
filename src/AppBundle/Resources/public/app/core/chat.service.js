angular.module('wsx.core').service('ChatService', ChatService);

ChatService.$inject = ['WebSocketService'];

function Channel(channelData, WebSocketService) {
    var that = this;
    this.messages = [];
    this.status = {
        subscribed : false
    };
    this.init = init;
    this.getTopic = getTopic;
    this.addMessage = addMessage;
    this.subscribe = subscribe;
    this.unSubscribe = unSubscribe;
    this.sendMessage = sendMessage;

    this.init(channelData);

    function init(data) {
        angular.extend(that, data);
    }

    function getTopic() {
        var topic = '';
        if (that['slug']) {
            topic = ['chat-topic', that.slug].join('/');
        }
        return topic;
    }

    function addMessage(msg) {
        that.messages.push(msg);
    }

    function subscribe() {
        function subscribeCallback(uri, payload) {
            that.addMessage(msg);    
        }

        function subscribeSuccess() {
            that.status.subscribed = true;
        }

        function subscribeError(error) {
            that.status.subscribed = false;
            console.log(error);
        }
        return WebSocketService.subscribe(that.getTopic(), subscribeCallback).then(subscribeSuccess, subscribeError);
    }

    function unSubscribe() {
        return WebSocketService.unSubscribe(that.getTopic());
    }

    function sendMessage(msg) {
        return WebSocketService.publish(that.getTopic(), msg);
    }
}

function ChatService(WebSocketService) {
    var that = this;
    this.channels = {
        bySlug: {},
        raw: []
    };
    this.addChannel = addChannel;
    this.getChannelBySlug = getChannelBySlug;
    this.loadChannels = loadChannels;

    function addChannel(channel) {
        that.channels.bySlug[channel.slug] = channel;
        that.channels.raw.push(channel);
    }

    function getChannelBySlug(slug) {
        return this.channels.bySlug[slug];
    }

    function loadChannels(channels)
    {
        angular.forEach(channels, function(val, idx) {
            var channel = new Channel(val, WebSocketService);
            that.addChannel(channel);
        });
    }
}