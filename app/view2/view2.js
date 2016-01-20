'use strict';

angular.module('myApp.view2', 
    [
        'ngRoute',
        'ngSanitize',
        'com.2fdevs.videogular'
    ]
)

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$location', 'SelectedGifs', '$sce', function($scope, $location, SelectedGifs, $sce) {
	$scope.giflist = SelectedGifs.gifs();
	if($scope.giflist.length == 0)
	{
		//We have nothing, go back to view 1
		$location.path('/view1');
	}
    //Other initialization
    $scope.theme = {url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"};
    
    $scope.resetData = function(){
        SelectedGifs.clearAll();
        $location.path('/view1');
    };
}]);