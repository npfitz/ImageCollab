app.service("ImageService", function($http){

	return {
		createImage: function(data){
			return $http.post("/Image", data);
		},

		updateImage: function(data, id){
			return $http.post("/Image/updateImage/" + id, data, {
				withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
			});
		}
	}
})