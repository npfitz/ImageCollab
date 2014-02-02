app.controller("imageController", function($scope, ImageData, ImageService){
	
	$scope.image = ImageData.data;

	$scope.imageDropped = function(){

		//Get the file
    var file = $scope.uploadedFile;

   	var formData = new FormData();
   	formData.append("image", file);

   	ImageService.updateImage(formData)


    //Clear the uploaded file
    $scope.uploadedFile = null;


	}

});