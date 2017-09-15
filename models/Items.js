var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ItemSchema = new mongoose.Schema({
	color: {type:String, default:"white"},
	fans: [{type:Schema.Types.ObjectId, ref:"Names"}]
})

mongoose.model('Items', ItemSchema);