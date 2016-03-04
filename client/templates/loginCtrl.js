var loginModule = angular.module('loginModule', []);

/**
 * feature: Login controller
 * author: Crown
 * date: Dec/12/2015
 */
loginModule.controller('loginCtrl', ['$scope', '$http', '$sce', '$location', function ($scope, $http, $sce, $location) {

    // Connect to socket.io
    var socket = io.connect('localhost:3000');

    // User Information
    $scope.user = {
        userid: "",
        useremail: "",
        username: ""
    };

    // Submit user information to server
    $scope.submit = function () {

        if (!($scope.user.username) != true) {
            $scope.user.userid = $scope.genUid();
            socket.emit('login', $scope.user);

            // redirect
            $location.path('/chat').replace();

        } else {
            alert('Please fill in u username');
        }

    };

    // Generate a unique id
    $scope.genUid = function () {
        return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
    }

}]);