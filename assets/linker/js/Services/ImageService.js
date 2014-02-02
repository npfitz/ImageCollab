app.service("ImageService", function($http){

	return {
		createImage: function(data){
			return $http.post("/Image", data);
		},

		updateImage: function(data){
			return $http.put("/Image/" + data.id, data, {
				withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
			});
		}
	}
})