'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$location', 'SelectedGifs', function($scope, $location, SelectedGifs) {
	$scope.giflist = SelectedGifs.gifs();
	if($scope.giflist.length == 0)
	{
		//We have nothing, go back to view 1
		$location.path('/view1');
	}
}]);