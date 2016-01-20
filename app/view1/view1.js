'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$location', 'CatGifs', 'SelectedGifs', function($scope, $location, CatGifs, SelectedGifs) {
	//Initialize variables
	$scope.num_gifs_to_keep = 5;
	$scope.loading = true;
	$scope.imgur_page = 0;
	$scope.loadingStyle = {display: 'block'};
	$scope.unloadingStyle = {display: 'none'};
	$scope.img_index = 0;
	$scope.giflist = SelectedGifs.gifs();
	
	//TODO: figure out how to skip albums (check is_album), and deal with gifv/webm stuff instead of .gifs? Something about checking for 'h' right before '.gif'?!?!
	
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
                    console.log("removed an album at index "+i);
                    $scope.images.splice(i, 1);
                    --i;
                }
                else
                {
                    //little hack so that gifs created from videos work properly (by default, their link has an extra 'h' right before '.gif' for some reason)
                    $scope.images[i].link = 'http://i.imgur.com/' + $scope.images[i].id + '.gif';                    
                }
            }
            
            console.log($scope.images[$scope.img_index]);
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
            console.log($scope.images[$scope.img_index]);
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