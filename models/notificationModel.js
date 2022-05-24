import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
	fingerprintId:{
		type:Number,
		required:[true,'Id is required']
	},
	message:{
		type:String,
		required:[true,"Message is required"]
	}
},{timestamps:true});

module.exports = mongoose.models.Notification || mongoose.model('Notification',notificationSchema);