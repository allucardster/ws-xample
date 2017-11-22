angular.module('wsx.layout').directive('wsxSidebar', wsxSidebar);

function wsxSidebar() {
    return {
        restrict: 'A',
        templateUrl: '/bundles/app/app/layout/sidebar.template.html',
        controller: 'SidebarController'
    };
}