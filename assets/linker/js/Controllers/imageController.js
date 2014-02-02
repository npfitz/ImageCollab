app.controller("imageController", function($scope, ImageData, ImageService){
	
	window.scope = $scope;

	$scope.image = ImageData.data;


	socket.get("/Image/subscribe/" + $scope.image.id, function(message){
		console.log(message);
		
		socket.on('message', function messageReceived(thing) {
			console.log(thing);
			if(thing[0].id == $scope.image.id){
				$scope.image.path = thing[0].path;
				$scope.$apply();
			}
		});
	})


	$scope.imageDropped = function(){

		//Get the file
    var file = $scope.uploadedFile;

   	var formData = new FormData();
   	formData.append("image", file);
   	formData.append("id", $scope.image.id);

   	ImageService.updateImage(formData, $scope.image.id)
   	// .success(function(data){
   	// 	console.log(data);
 			// $scope.image = data;
   	// })

    //Clear the uploaded file
    $scope.uploadedFile = null;


	}

});