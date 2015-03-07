/* 
*	app.js - Define all the modules being used
*/

angular.module('Youbify', 
	['ngRoute',
	'ngMessages',
	'NavbarCtrl',
	'appRoutes', 
	'smart-table',
	'paginationCtrl',
	'safeCtrl',
	'MainCtrl', 
	'SongCtrl',
	'SongDetailCtrl',
	'SongService', 
	'PlaylistCtrl',
	'PlaylistService',
	'PlaylistDetailCtrl',
	'404Ctrl']);

