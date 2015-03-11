angular.module('SongCtrl', ['ui.bootstrap', 'smart-table', 'ngAnimate']).controller('SongController', function(Song, $scope, $http, $sce, $location) {

	$scope.tagline = 'List of songs';
	$scope.addSongHeader = 'Add new songs';
	$scope.addSongTagline = 'Add a new song to your library.';
	$scope.songToPlaylist = "Add song to playlist"
	$scope.whatPlaylist = 'Do you want to add a song to a playlist?';
	$scope.songAdded = '';
	$scope.songCollection = [];
  $scope.playlistURL = '/api/playlists:';
  $scope.songID = '';
  $scope.playlistID = '';
  $scope.playlistsongs = [];

  $http.get('/api/songs')
  .success(function(data) {
    $scope.songs = data;

  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $scope.searchSong = function (term) {
    return $http({
      url: '/api/songs',
      method: 'GET',
    }).
    then(function (response) {
      var titles = [];
      for (var i = 0; i < response.data.length; i++) {
        titles.push(response.data[i].title);
      }
            console.log(titles);//as expected

            return titles;
          });
  };

  $scope.searchPlaylist = function (term) {
    return $http({
      url: '/api/playlists',
      method: 'GET',
    }).
    then(function (response) {
      var playlistNames = [];
      for (var i = 0; i < response.data.length; i++) {
        playlistNames.push(response.data[i].name);
      }
            console.log(playlistNames);//as expected

            return playlistNames;
          });
  };

  $scope.addSong = function() {
    $http({
      url: '/api/songs',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
       artist: $scope.inputArtist, 
       title: $scope.inputTitle,
       genre: $scope.inputGenre, 
       url: $scope.inputYoutubeUrl}
     });
	/*
	*		Inform user of song added and clear the fields
	*/
	$scope.songAdded = 'Song successfully added!';
	$scope.inputArtist = "";
	$scope.inputTitle  = "";
	$scope.inputGenre = "";
	$scope.inputYoutubeUrl = "";
  updateSongs();
}


$scope.addSongToPlaylist = function (term) {
        // Get the ID for the song with a GET request for song

        $http({
          url: '/api/songs',
          method: 'GET',
        })

        .then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            if(response.data[i].title === $scope.inputTitleTypeahead){
             $scope.songID += response.data[i]._id.toString();
           }
         }
     //       console.log("Song " + songID);//as expected
   });

        // Get the ID for the playlist with a GET request for playlist

        $http({
          url: '/api/playlists',
          method: 'GET',
        })

        .then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            if(response.data[i].name === $scope.inputPlaylistTypeahead){

             $scope.playlistID += response.data[i]._id.toString();
             console.log($scope.playlistID);

             for(var j = 0; j < response.data[i].playlistsongs.length; j++){
              console.log( "a song in the playlist:" + response.data[i].playlistsongs[j] );
              $scope.playlistsongs.push(response.data[i].playlistsongs[j].toString());
            }
            break
          }
        }
     //       console.log("Playlist: " + playlistID[0]);//as expected
     $rootScope.playlistURL += $scope.playlistID[0];
   //     	console.log(playlistURL);

   console.log("URL for playlist: " + $scope.playlistURL);
   console.log("PlaylistID: " + $scope.playlistID);
   console.log("Song ID: " + $scope.songID);
   console.log("Playlistsongs index 0: " + $scope.playlistsongs);

 });



    //    console.log("Song ID: " + $scope.songID);
    //    console.log("Playlistsongs index 0: " + $scope.playlistsongs[0]);
  }

  var updateSongs = function(){
    $http.get('/api/songs')
    .success(function(data) {
      $scope.rowCollection = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

    $scope.displayedCollection = [].concat($scope.rowCollection);
  };

  updateSongs();


  $scope.removeItem = function removeItem(row) {
    var index = $scope.rowCollection.indexOf(row);
    if (index !== -1) {
      $scope.rowCollection.splice(index, 1);
    }

    $http.delete('/api/songs/' + row._id)
    .success(function(data) {
      console.log("succesfully deleted" + row._id)
      console.log(data);

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  }

  $scope.go = function(row){
    console.log(row);
    $location.path( "/songs/" +row._id);
  };

// WORKS FINE:::::::::

		// $http({
		// url: '/api/playlists/54f8b46c3a1ca934f4dae6f7',
		// method: 'PATCH',
		// data: {
		// playlistsongs : ['54f88ee4a4d57da8bec141ce']
		// }
		// 	});

//                 $http({
//         	url: '/api/playlists/:' + playlistID
//         	method: 'PATCH',
// 		data: {
// 			playlistsongs: [songID[0]]
// 		}
// };




});
    /*

  var data = "{"_id":"54f4f8a991abf7ff3c64eef0","songz":[],"__v":1,"playlistsongs":[{"_id":"54f458dc6ded49621c043e54","url":"https://www.youtube.com/watch?v=FWR9MR5juWI","genre":"Deep House","title":"You Know You Like It","artist":"AlunaGeorge","__v":0},{"_id":"54f6ddaedc61acb63b406711","url":"https://www.youtube.com/watch?v=UtF6Jej8yb4","genre":"House","title":"The nights","artist":"Avicii","__v":0}]}";

> data
'{"_id":"54f4f8a991abf7ff3c64eef0","songz":[],"__v":1,"playlistsongs":[{"_id":"54f458dc6ded49621c043e54","url":"https://www.youtube.com/watch?v=FWR9MR5juWI","genre":"Deep House","title":"You Know You Like It","artist":"AlunaGeorge","__v":0},{"_id":"54f6ddaedc61acb63b406711","url":"https://www.youtube.com/watch?v=UtF6Jej8yb4","genre":"House","title":"The nights","artist":"Avicii","__v":0}]}'
> var obj = JSON.parse(data);

> obj
{ _id: '54f4f8a991abf7ff3c64eef0',
  songz: [],
  __v: 1,
  playlistsongs: 
   [ { _id: '54f458dc6ded49621c043e54',
       url: 'https://www.youtube.com/watch?v=FWR9MR5juWI',
       genre: 'Deep House',
       title: 'You Know You Like It',
       artist: 'AlunaGeorge',
       __v: 0 },
     { _id: '54f6ddaedc61acb63b406711',
       url: 'https://www.youtube.com/watch?v=UtF6Jej8yb4',
       genre: 'House',
       title: 'The nights',
       artist: 'Avicii',
       __v: 0 } ] }
> obj.playlistsongs.map(function(song) {return song._id});
[ '54f458dc6ded49621c043e54', '54f6ddaedc61acb63b406711' ]
> var ids = obj.playlistsongs.map(function(song) {return song._id});
undefined
> ids.push('newid');
3
> ids
[ '54f458dc6ded49621c043e54',
  '54f6ddaedc61acb63b406711',
  'newid' ]
> 

    */