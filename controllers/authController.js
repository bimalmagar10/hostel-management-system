import {sign} from "jsonwebtoken";
import {serialize} from "cookie";
import Admin from "../models/adminModel";
const login = async (req,res) => {
	    console.log("login baata",req.body);
    	const {username,password} = req.body;
    	//Check if the username and password exists
		if(!username || !password){
			return res.status(400).json({
				status:'error',
				msg:'Please provide username or password'
			});
		}
		//Check if the user exists and the password is correct
		const user = await Admin.findOne({username}).select('+password');
		//const correct await user.correctPassword(password,user.password);

		if(!user || !(await user.correctPassword(password,user.password))){
			return res.status(401).json({status:'error',msg:'Invalid username or password!'});
		}

		//If everything else is fine create token and send it to the browser
		const token = sign({id:user._id},process.env.SECRET_KEY,{
			expiresIn:process.env.EXPIRES_IN
		});
		const serialised = serialize("MyJWT",token,{
			httpOnly: true,
	      	secure: process.env.NODE_ENV !== "development",
	      	sameSite: "strict",
	      	maxAge: 60 * 60,
	      	path: "/",
	      });
		res.setHeader('Set-Cookie',serialised);
		res.status(200).json({status:'success',token:token});
// 		if(username === "admin" && password === "admin"){
// 			const token = sign({username},process.env.SECRET_KEY,{
// 				expiresIn:process.env.EXPIRES_IN
// 			});
// 
// 			const serialised = serialize("MyJWT",token,{
// 				httpOnly: true,
// 		      	secure: process.env.NODE_ENV !== "development",
// 		      	sameSite: "strict",
// 		      	maxAge: 60 * 60,
// 		      	path: "/",
// 			});
// 			res.setHeader('Set-Cookie',serialised);
// 			res.status(200).json({status:'success',token:token});
// 
// 		}else {
// 			res.status(401).json({status:'error',msg:'Invalid credentials'});
// 		}
		
};

const logout = (req,res) => {
	const serialised = serialize("MyJWT","loggedout",{
		httpOnly: true,
      	secure: process.env.NODE_ENV !== "development",
      	sameSite: "strict",
      	maxAge: 60 * 60,
      	path: "/"
     });
	res.setHeader('Set-Cookie',serialised);
	res.status(200).json({status:'success'});
};

const addAdmin = async (req,res) => {
	try{
		const newAdmin = await Admin.create({
			username:req.body.username,
			password:req.body.password,
			confirmPassword:req.body.confirmPassword
		});
		const token = sign({id:newAdmin._id},process.env.SECRET_KEY,{
				expiresIn:process.env.EXPIRES_IN
		});
		res.status(201).json({
	   		status:'success',
	   		token,
	   		data:{
	   			newAdmin
	   		}
		});
	}catch(err){
		console.log(err);
		res.status(400).json({status:'error',msg:err});
	}

};

const updatePassword = async (req,res) => {
 	//Get the admin from the collection
 	const admin = await Admin.findById(req.body.id).select('+password');
 	if(!admin){
 		return res.status(400).json({status:'error',msg:"Not found"});
 	}
 	//Check if the password is correct
 	if(!(await admin.correctPassword(req.body.currentPassword,admin.password))){
 		return res.status(401).json({status:"error",msg:'Your current password is wrong!'});
 	}

 	admin.password = req.body.password;
 	admin.confirmPassword = req.body.confirmPassword;
 	try {
	 	await admin.save();
	 	res.status(201).json({
	 		status:'success'
	 	})
	 } catch(err){
	 	res.status(400).json({
	 		status:'error',
	 		msg:'Password and confirm password should match'
	 	});
	 }
 	//login and send jwt
};

const authController = {
	login,
	logout,
	addAdmin,
	updatePassword
};
export default authController;