import mongoose from "mongoose";
const studentSchema = mongoose.Schema({
	fullname:{
		type:String,
		required:[true,'Full name is required']
	},
	rollno:{
		type:String,
		required:[true,'Roll no is required']
	},
	dob:{
		type:String,
		required:[true,'Date of birth is required']
	},
	phone:{
		type:Number,
		required:[true,'Phone number is required']
	},
	pphone:{
		type:Number,
		required:[true,'Parents phone number is required']
	},
	email:{
		type:String,
		required:[true,'Email is required']
	},
	address:{
		type:String,
		required:[true,'Address is required']
	},
	fingerprint:{
		type:Number,
		required:[true,'Fingerprint is required']
	},
	fathersName:{
		type:String,
		required:[true,"Father's name is required"]
	},
	mothersName:{
		type:String,
		required:[true,"Mother's name is required"]
	},
	faculty:{
		type:String,
		required:[true,"Faculty is required"]
	}
},{timestamps:true});

module.exports = mongoose.models.Student || mongoose.model('Student',studentSchema);