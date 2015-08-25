'use strict';

/**
 * @ngdoc overview
 * @name takeNoteApp
 * @description
 * # takeNoteApp
 *
 * Main module of the application.
 */
angular
    .module('takeNoteApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    })
    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    });
