//import Notification from './../models/notificationModel';
import Student from "../models/studentModel";
import notificationController from './../utils/notificationController';
import {verificationStatus} from '../utils/helpers';
import axios from "axios";

const findStudentById = async (id) => {
	const student = await Student.find({fingerprint:id}); 
	return student;
};
const addSuccess = async (req,res) => {
	const {id,msg} = req.body;
	console.log("id of student",id);
	if(id !== '0'){
		try{
			const [{fullname,rollno}] = await findStudentById(parseInt(id));
			console.log(fullname);
			console.log(rollno);
			
			 if(!fullname || !rollno){
			 	throw `Error!!! can't find matching name and roll no`;
			 } 
			// if(!student){
			// 	throw `Error!!! can't find matching name and roll no`;
			// }
			const newStat = {
				fingerprintId:id,
				message:`${msg} with name ${fullname} and rollno ${rollno}`
			};
			notificationController.create(newStat);
			res.status(200).json({
				data:newStat
			});
		}catch(err){
			console.log("Error!!! can't find matching name and roll no");
			const newStat = {
				message:"Error!!! can't find matching name and roll no"
			};
			notificationController.create(newStat);
			res.status(400).end(`Error!!`);
		}
	} else {
		const newStat = {
		fingerprintId:id,
		message:msg
	    };
		notificationController.create(newStat);
	}

};
const deleteSuccess = async (req,res) => {
	notificationController.del();
	res.status(204).end(`Deleted!!`);
};

const storeFingerprint = async (req,res) => {
	const {msg} = req.body;
	const storeMsg = {
		message:msg
	};
	notificationController.storeFingerprint(storeMsg);
	res.status(200).end('Fingerprint Stored!!');
};

const deleteFingerprintMsg = async (req,res) => {
	notificationController.deleteFingerprintMsg();
	res.status(204).end("Deleted stored message!!");
}

const deleteFromSensor = async (req,res) => {
	try{
		const finger = await axios.post(`${process.env.WIFI_IP_ADDRESS}/delete`,req.body);
		res.status(204).end(`Deleted finger from database`);
	}catch(err){
		console.log("ERROR!!");
	}
	
};

const nodemcuController = {
	addSuccess,
	deleteSuccess,
	storeFingerprint,
	deleteFingerprintMsg,
	deleteFromSensor
};
export default nodemcuController;