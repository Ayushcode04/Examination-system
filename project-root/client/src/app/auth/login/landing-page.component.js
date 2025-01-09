angular.module('app').controller('LandingPageController', [
    '$scope', '$location',
    function ($scope, $location) {
        $scope.redirectToLogin = function () {
            // Redirect to the login page
            $location.path('/login');
        };
    }
]);