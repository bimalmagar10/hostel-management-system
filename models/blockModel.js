import mongoose from 'mongoose';
const blockSchema = mongoose.Schema({
	title:{
		type:String,
		required:[true,'Please enter the block title']
	},
	slug:{
		type:String,
		required:[true,'Please enter the slug']
	}
},{timestamps:true});

module.exports = mongoose.models.Block || mongoose.model('Block',blockSchema);