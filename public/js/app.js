/* 
*	app.js - Define all the modules being used
*/

angular.module('Youbify', 
	['ngRoute',
	'ngMessages',
	'appRoutes', 
	'smart-table',
	'MainCtrl', 
	'SongCtrl',
	'SongDetailCtrl',
	'SongService', 
	'PlaylistCtrl',
	'PlaylistService',
	'PlaylistDetailCtrl',
	'404Ctrl']);

