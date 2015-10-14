'use strict';

// Declare app level module which depends on views, and components
angular.module('fasterThanLight', [
    'ngRoute',
    'fasterThanLight.view1',
    'fasterThanLight.view2',
    'ngWebsocket',
    'n3-line-chart'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
