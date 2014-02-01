app.directive("imageCollab", function(){

	return {

		link: function(scope, element, attrs){

			console.log('found element!');

			element[0].height = element.prop('offsetHeight');
			element[0].width = element.prop('offsetWidth');

			var ctx = element[0].getContext("2d");
			var img = new Image();

			img.onload = function(e){
				
				var ratio = img.height / element.prop('offsetHeight');
				var margin = (element.prop('offsetWidth') - (img.width/ratio))/2
				console.log(ratio);
				ctx.drawImage(img, margin, 0, img.width/ratio, img.height/ratio);

				console.log(ctx.getImageData(margin, 0, img.width/ratio, img.height/ratio));
			}

			img.src = attrs["imageCollab"];

			console.log(img.src);

		}
	}
})