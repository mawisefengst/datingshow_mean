var models = require("../models/models");

var Registrant = models.Registrant,
    Fupload = models.Fupload,
    fs = require('fs-extra'),
    formidable = require("formidable");
   


module.exports.list = function(req, res){
	Registrant.find(function(err,result){
		res.json(result);
	});
}

module.exports.thanks = function(req, res){
	Registrant.find({},function(err,result){
		res.json(result);
	});
}

var getErrorMessage = function(err) {
	var message = '';
	for (var errName in err.errors) {
		if (err.errors[errName].message) {
			message = err.errors[errName].message;
			return message;
		}
	}
	return message;
};

var imageSave = function(req,res,result){
	var form = new formidable.IncomingForm();
	var result_from_DB;
	form.maxFieldsSize = 5 * 1024 * 1024;
	form.uploadDir =  appRoot + "/server/upload/";
	form.encoding = 'utf-8';
	form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
    	if (err) {
          console.error(err.message);
          return;
        }

    	if(typeof files.original != "undefined"){
    		var fileObj = files.original;
    		if(fileObj.type != "image/png" && fileObj.type != "image/jpg" && fileObj.type != "image/gif" && fileObj.type != "image/jpeg"){
    			 res.status(400).send({"message": "Image formats must be .gif, .jpg, .png"});
    			 res.end();
    		} 
    		if(fileObj.size > 5 *1024 * 1024 ){
    			 res.status(400).send({"message": "Image size is over limit(5MB)"});
    			 res.end();
    		}
    	}
    });

    form.on('field', function(name, value) {
    	var object_ = value;
		var registrant = new Registrant(JSON.parse(value));
		registrant.fupload = "comming soon"
    	//for validation
    	registrant.save(function(err,result){
			if (err) {return res.status(400).send({"message":getErrorMessage(err)});
		    }else{ 
		    	//var  dd=  res.json(result); 
		    	result_from_DB = result;
		    }
	    });
	});

    form.on('error', function(err) { console.log(err)});
    //check other fields
	form.on("end", function(fields,files){
        var temp_path = this.openedFiles[0].path;
        var file_name = this.openedFiles[0].name;
        var dateObj = new Date();
        var fileName =  dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate() + '/'  +  file_name ;
		var new_file_name =  appRoot + "/server/upload/" + fileName;
		fs.copy(temp_path, new_file_name, function(err) {  
			if (err) console.error(err);
			else {
				fs.unlink(temp_path, function (err) { if (err) throw err;});
				result_from_DB.fupload = new_file_name;
				result_from_DB.save(function(err,result){
					if (err) {return res.status(400).send({"message":getErrorMessage(err)});
				    }else return res.json(result);
			    });
			}
		});
	});
}


module.exports.create = function(req,res){
	imageSave(req,res,"");
}

