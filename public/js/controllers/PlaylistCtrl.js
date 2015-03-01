angular.module('PlaylistCtrl', []).controller('PlaylistController', function($scope) {

    $scope.tagline = 'Here\'s yo mad playlists mon!';
    $http.get('/api/playlists')
                .success(function(data) {
                        $scope.playlists = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
});