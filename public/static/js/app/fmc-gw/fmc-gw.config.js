(function() {
    'use strict';

    angular.module('fmcGw')
        .config(config);

    function config ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('form', {
                url: '/fmc-gw',
                templateUrl : '/static/js/app/fmc-gw/fmc-gw-form.html',
                controller : 'fmcGwController'
            })
            .state('validate', {
                templateUrl : '/static/js/app/fmc-gw/fmc-gw-validation.html',
                controller : 'fmcGwController'
            })
            .state('confirmation', {
                templateUrl : '/static/js/app/fmc-gw/fmc-gw-confirmation.html'
            });
    }

}());