var loginModule = angular.module('chatModule', []);

/**
 * feature: Login controller
 * author: Crown
 * date: Dec/12/2015
 */
loginModule.controller('chatCtrl', ['$scope', '$http', '$sce', '$location', function ($scope, $http, $sce, $location) {

    // Connect to socket.io
    var socket = io.connect('localhost:3000');

    $scope.members = "eee";
    $scope.message = "";

    // init monotor
    socket.on('login', function (obj) {

        for (key in obj.onlineUsers) {
            if (obj.onlineUsers.hasOwnProperty(key)) {
                $scope.members += obj.onlineUsers[key] + " & ";
                console.log($scope.members);

            }
        }

        $scope.$apply(function () {
            $scope.members = 'niaonaona';
        });

        $scope.submitMessage();

    });

    // Monotor message
    socket.on('message', function (obj) {

        var htmlStr = '<p class="text-right">' + obj.content + '</p>';
        $("#chat_area").append(htmlStr);

    });

    // Submit message
    $scope.submitMessage = function () {
        var messageInfo = {
            username: 'Tom',
            content: $scope.message
        };
        socket.emit('message', messageInfo);

        console.log('###############');
    };

}]);