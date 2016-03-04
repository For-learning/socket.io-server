'use strict';

/* App Module */

var routerApp = angular.module('routerApp', [
    'ngRoute',
    'loginModule',
    'chatModule'
]);

// Monitor the change of path
routerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            }).
            when('/chat/', {
                templateUrl: 'templates/chat.html',
                controller: 'chatCtrl',
                authenticate: true
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]) //.run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    //    $rootScope.$on('$routeChangeStart', function (event, next, current) {
    //        // If this page need to be checked, check it.
    //        if (next.authenticate) {
    //
    //            var promise = Auth.isUserLogin();
    //
    //            promise.then(function (data) {
    //
    //                console.log(data.toString());
    //                // if session NOT exit
    //                if (data === null || data === undefined || data === '') {
    //                    $location.path('/login').replace();
    //                }
    //
    //            }, function (err) {
    //                console.log(err);
    //            });
    //        }
    //        console.log('Monitor the change of path');
    //    });

//});