var mongoose = require('mongoose');

var NameSchema = new mongoose.Schema({
	name: {type:String, default:"Blank", unique:true, trim:true, lowercase:true},
})

mongoose.model('Names', NameSchema);