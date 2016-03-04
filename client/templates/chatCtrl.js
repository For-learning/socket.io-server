var loginModule = angular.module('chatModule', []);

/**
 * feature: Login controller
 * author: Crown
 * date: Dec/12/2015
 */
loginModule.controller('chatCtrl', ['$scope', '$http', '$sce', '$location', function ($scope, $http, $sce, $location) {

    // Connect to socket.io
    var socket = io.connect('localhost:3000');

    $scope.members = "";
    $scope.message = "";
    $scope.currentUser = "";

    // init monotor
    socket.on('login', function (obj) {

        for (key in obj.onlineUsers) {
            if (obj.onlineUsers.hasOwnProperty(key)) {
                $scope.members += obj.onlineUsers[key] + " & ";
                console.log($scope.members);
            }
        }
        $("#ad_area").html($scope.members + "add to our chat.");
        $scope.currentUser = obj.user.username;

    });

    // Monotor message
    socket.on('message', function (obj) {

        var htmlStr = '<p class="text-right">' + obj.content + ' : ' + obj.username + '</p>';
        $("#chat_area").append(htmlStr);

    });

    // Submit message
    $scope.submitMessage = function () {
        if (!($scope.message) != true) {
            var messageInfo = {
                username: $scope.currentUser,
                content: $scope.message
            };
            socket.emit('message', messageInfo);
            $scope.message = "";
        } else {
            alert("u must fill in some message.");
        }

    };

}]);