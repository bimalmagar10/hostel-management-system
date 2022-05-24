import mongoose from "mongoose";
const bcrypt = require('bcryptjs');
const adminSchema = new mongoose.Schema({
	username:{
		type:String,
		unique:true,
		required:[true,'Username is required']
	},
	password:{
		type:String,
		required:[true,'Password is required'],
		minlength:[4,'password must be minimum of eight characters long'],
		select:false
	},
	confirmPassword:{
		type:String,
		required:[true,'Please confirm your password'],
		validate:{
			//This only works on CREATE AND SAVE but not on update
			validator:function(el) {
				return el === this.password;
			},
			message:'Password and confirm  password should match'
		}
	},
	passwordChangedAt:Date,
});

//STEP:1
adminSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);

    this.confirmPassword = undefined;
    next();
});
//STEP:2
adminSchema.methods.correctPassword = async function(candidatePassword,adminPassword){
	return await bcrypt.compare(candidatePassword,adminPassword);
};

module.exports = mongoose.models.Admin || mongoose.model('Admin',adminSchema);