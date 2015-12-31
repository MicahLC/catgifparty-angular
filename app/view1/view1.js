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
	$scope.img_index = 0;
	
	$scope.nextImage = function() {
		if($scope.img_index == $scope.images.data.length - 1)
		{
			//fetch new images
		}
		else
		{
			$scope.img_index++;
		}
		
	}
	
	$scope.keepImage = function(imageUrl) {
		SelectedGifs.addGif(imageUrl);
		$scope.giflist = SelectedGifs.gifs();
		$scope.nextImage();
	};
}]);