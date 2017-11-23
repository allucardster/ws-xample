angular.module('wsx').config(BindingSymbols);
angular.module('wsx').config(Routing);

BindingSymbols.$inject = ['$interpolateProvider'];

function BindingSymbols($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
}

Routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

function Routing($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
    // Define routing states
    var main = {
        url: '/',
        templateUrl: '/bundles/app/app/layout/main.template.html',
        controller: 'MainController',
        controllerAs: 'main'
    };
    var chat = {
        url: '/{slug}/channel',
        templateUrl: '/bundles/app/app/chat/chat.template.html',
        controller: 'ChatController',
        controllerAs: 'chat',
        resolve: {
            slug: function($transition$) {
                return $transition$.params().slug;
            }
        }
    }
    // Register routing states
    $stateProvider.state('main', main);
    $stateProvider.state('chat', chat);
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
}