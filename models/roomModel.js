const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
export const roomSchema = mongoose.Schema({
	roomName:{
		type:String,
		unique:true,
		required:[true,'Room name is required']
	},
	blockName:{
		type:String,
		required:[true,'Block name is required']
	},
	tables:{
		type:Number,
		required:[true,'Tables is required']
	},
	chairs:{
		type:Number,
		required:[true,'Chairs is required']
	},
	beds:{
		type:Number,
		required:[true,'Beds is required']
	},
	wardrobe:{
		type:Number,
		required:[true,'Wardrobe is required']
	},
	students:{
		type:Array,
		unique:true,
		required:[true,'Students is required']
	}

},{ timestamps: true });
roomSchema.plugin(uniqueValidator);

module.exports = mongoose.models.Room || mongoose.model('Room',roomSchema);