/*
*   Handle the HTTP requests from the Playlist page
*/

angular.module('PlaylistService', []).factory('Playlist', ['$http', function($http) {

var getPlaylist = function() {
    return $http.get('/api/playlists', {cache:true})
    .then(function(data){
        return data;
    })
}


    return {
        // call to get all playlists
        getPlaylist : getPlaylist
    }

        // post : function() {
        //     return $http.post('/api/playlists');
        // },

        // // these will work when more API routes are defined on the Node side of things
        // // call to POST and create a new playlist
        // create : function(playlistData) {
        //     return $http.post('/api/playlists', playlistData);
        // },

        // // call to DELETE a playlist
        // delete : function(id) {
        //     return $http.delete('/api/playlists/' + id);
        // }
    

}]);