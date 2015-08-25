'use strict';

angular.module("templates", []);

angular.module(
    'Tree', [
        'templates',
        'ui.router',
        'ui.bootstrap',
        'tree.services',
        'tree.directives',
        'tree.controllers'
    ]
)
    .config(
    [
        '$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise(function ($injector, $location) {
                var redirectUrl = '/';
                if ($location.url() || ($location.absUrl() != $location.protocol() + '://' + $location.host() + '/')) {
                    redirectUrl = '/404';
                }
                return redirectUrl;
            });

            $stateProvider
                .state(
                'base',
                {
                    abstract: true,
                    templateUrl: '/templates/base.html'
                }
            )
                .state(
                'base.home',
                {
                    url: '/',
                    controller: 'IndexController',
                    templateUrl: '/templates/index/index.html'
                }
            ).state(
                'base.404', {
                    url: '/404',
                    templateUrl: '/templates/404/index.html'
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ]
)
    .run(
    [
        '$rootScope',
        '$state',
        function ($rootScope, $state) {

            $rootScope.$on(
                "$stateChangeStart", function () {
                    $rootScope.mainModal.close();
                }
            );

            $rootScope.state = $state;
            $rootScope.mainModal = {
                close: function () {
                    try {
                        if ($rootScope.mainModal.modal) {
                            $rootScope.mainModal.modal.close();
                        }
                    }
                    catch (e) {
                    }
                },
                modal: null
            };

            $rootScope.objectSize = function (obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };
        }
    ]
);

var treeControllers = angular.module('tree.controllers', []);
var treeDirectives = angular.module('tree.directives', []);
var treeServices = angular.module('tree.services', []);