app.controller("imageController", function($scope, ImageData, ImageService){
	
	window.scope = $scope;

	$scope.image = ImageData.data;

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

		socket.on('message', function messageReceived(message) {
			console.log(message);
			$scope.image.path = message.data.path;
		});
		
    //Clear the uploaded file
    $scope.uploadedFile = null;


	}

});