'use strict';

angular.module('myApp.view1', 
    [
        'ngRoute',
        'ngSanitize',
        'com.2fdevs.videogular'
    ]
)

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$location', 'CatGifs', 'SelectedGifs', '$sce', function($scope, $location, CatGifs, SelectedGifs, $sce) {
	//Initialize variables
	$scope.num_gifs_to_keep = 5;
	$scope.loading = true;
	$scope.imgur_page = 0;
	$scope.loadingStyle = {display: 'block'};
	$scope.unloadingStyle = {display: 'none'};
	$scope.img_index = 0;
	$scope.giflist = SelectedGifs.gifs();
    
    //Initialize the media configs
    $scope.videoconfig = {
        preload: "none",
        /*sources: [ to be filled in later
            {src: }
        ],*/
        theme: {
					url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
		}
    };
    
    $scope.updateVideoSources = function(){
        $scope.videoconfig.sources = 
        [
            {src: $sce.trustAsResourceUrl($scope.images[$scope.img_index].webm), type: "video/webm"},
            {src: $sce.trustAsResourceUrl($scope.images[$scope.img_index].mp4), type: "video/mp4"}
        ];
    };
	
	//Declare functions
	$scope.getNextGifPage = function(){
		CatGifs.query({page: $scope.imgur_page}, function(results){
			$scope.loading = false;
			$scope.loadingStyle = {display: 'none'};
			$scope.unloadingStyle = {display: 'block'};
			$scope.images = results.data;
            
            for(var i = 0; i < $scope.images.length; ++i)
            {
                //Get rid of albums from the array.
                if($scope.images[i].is_album)
                {
                    //console.log("removed an album at index "+i);
                    $scope.images.splice(i, 1);
                    --i;
                }
                else
                {
                    //little hack so that gifs created from videos work properly (by default, their link has an extra 'h' right before '.gif' for some reason)
                    $scope.images[i].link = 'http://i.imgur.com/' + $scope.images[i].id + '.gif';                    
                }
            }
            
            //console.log($scope.images[$scope.img_index]);
            $scope.updateVideoSources();
		});
		++$scope.imgur_page;
		$scope.img_index = 0;
	};
	
	$scope.nextImage = function() {
        if($scope.img_index == $scope.images.length - 1)
        {
            //fetch new images
            $scope.getNextGifPage();
        }
        else
        {
            ++$scope.img_index;
            //console.log($scope.images[$scope.img_index]);
            $scope.updateVideoSources();
        }
	};
	
	$scope.keepImage = function(imageUrl) {
		SelectedGifs.addGif(imageUrl);
		$scope.giflist = SelectedGifs.gifs();
		if($scope.giflist.length == $scope.num_gifs_to_keep)
		{
			//Go to view 2
			$location.path('/view2');
		}
		else
		{
			$scope.nextImage();
		}
	};
	
	//Now call any functions necessary to get things going
	$scope.getNextGifPage();
}]);