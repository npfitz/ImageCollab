/**
 * ImageController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

	"find": function(req, res){
		Image.findOne(req.param("id"))
		.exec(function(err, image){
			res.send(image);
		})
	},

  "subscribe": function(req, res){
    Image.subscribe(req.socket, [req.param("id")]);
    res.send({message: "Subscribed for room: " + req.param("id")});
  },


  "updateImage": function (req, res) {

    var fs = require('fs');
    var Buffer = require('buffer').Buffer;
    var constants = require('constants');


    var imageSize = req.files.image.size;
    var imageDstPath = sails.config.appPath + "/assets/images/" + req.files.image.name;
    var imageDstPath2 = sails.config.appPath + "/.tmp/public/images/" + req.files.image.name;
    console.log("imagePath = " + imageDstPath);
    console.log(req.files.image.path);


    fs.open(req.files.image.path, 'r', function(err, fd) {
      if (err) { console.log(err.message) }
      else {
        var buffer = new Buffer(imageSize);
        fs.read(fd, buffer, 0, imageSize, 0, function(err, bytesRead, buffer) {
          if (err) { console.log(err.message) }
          else {
            fs.open(imageDstPath, 'w', function(err, fd){
              if (err) { console.log(err.message) }
              else {
                fs.write(fd, buffer, 0, imageSize, 0, function(err, bytesWritten, buffer) {
                  if (err) { console.log(err.message) }


                  fs.open(imageDstPath2, 'w', function(err, fd){
                    if (err) { console.log(err.message) }
                    else {
                      fs.write(fd, buffer, 0, imageSize, 0, function(err, bytesWritten, buffer) {
                        if (err) { console.log(err.message) }
                        Image.findOrCreate(req.param('id'))
                        .exec(function(err, image) {
                          image.path = "/images/" + req.files.image.name;
                          image.save(function (err){});
                          console.log("Sending Update");
                          //console.log(Image.subscribers())
                          Image.publish(req, [{id: image.id, path: image.path}], {
                            path: image.path
                          });
                        });
                      });
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
    
   

  },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ImageController)
   */
  _config: {}


};
