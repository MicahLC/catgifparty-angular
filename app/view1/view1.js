'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'CatGifs', 'SelectedGifs', function($scope, CatGifs, SelectedGifs) {
	var gifs_to_keep = 5;
	$scope.loading = true;
	$scope.loadingStyle = {display: 'block'};
	$scope.images = CatGifs.query(function(data) { $scope.loading = false; $scope.loadingStyle = {display: 'none'}; });
	$scope.giflist = SelectedGifs.gifs();
	
	$scope.keepImage = function(imageUrl) {
		console.log("keepImage has been called with "+imageUrl);
		SelectedGifs.addGif(imageUrl);
		console.log(SelectedGifs.gifs());
		$scope.giflist = SelectedGifs.gifs();
	};
}]);