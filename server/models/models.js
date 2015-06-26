var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	validator = function(property){
		if(property == null) return false;
		else return property.length;
	}

var registrantSchema = Schema({
	id : {type : Number, index:true},
	created: {type: Date, default: Date.now},
	firstName: {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your first name."]
	},
	lastName:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your last name."]
	},
	email:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your email address."],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	occupation:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your occupation."]
	},
	phone: {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your phone number."]
	},
	age:  {
		type: Number,
		trim: true,
		default: "",
		validate: [validator, "Please select your birth year."]
	},
    city:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your city."]
	},
	state:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please select your state."]
	},
	term:  {
		type: Boolean,
		trim: true,
		default: "",
		validate: [validator, "You may not enter if you are not attending the 2015 ESSENCE Festival."]
	},
	crush:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your celebrity crush."]
	},
	single:  {
		type: Boolean,
		trim: true,
		default: "",
		validate: [validator, "Please tell us if you're single."]
	},
	children: {
		type: Boolean,
		trim: true,
		default: "",
		validate: [validator, "Please tell us if you have children."]
	},
	numChidren:  {
		type: Number,
		trim: true,
		default: ""
	},
	perfectDate: {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please describe your perfect date."]
	},
	whySelect: {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please describe why you should be selected for the Steve Harvey Dating Show."]
	},
	single:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please tell us if you are single"]
	},
	attending: {
		type: Boolean,
		trim: true,
		default: "",
		validate: [validator, "You may not enter if you are not attending the 2015 ESSENCE Festival."]
	},
	firstTimie:  {
		type: Boolean,
		trim: true,
		default: ""
	},
	sex:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please select your gender."]
	},
	fupload :  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please choose your picture."]
	}
});

var fuploadSchema = Schema({
	id : {type : Number, index:true},
	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now},
	slug : {type : Number, index:true},
	version: String,
	contentType: String,
	contentSize: String,
	path:String,
	registrant : [{type:Schema.Types.ObjectId, ref: 'Registrant'}]
});
 
var Registrant = mongoose.model("Registrant", registrantSchema);

var exports_Obj = {
	Registrant : Registrant,
	Fupload: mongoose.model("Fupload", fuploadSchema)
};

module.exports = exports_Obj;

