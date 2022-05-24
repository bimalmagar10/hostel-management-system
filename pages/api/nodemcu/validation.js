import nodemcuController from "./../../../controllers/nodemcuController";
import axios from "axios";
export default function handler(req,res){
	switch(req.method){
		case 'GET':
		return startVerfication();
		case 'POST':
		return validate();
		case 'DELETE':
		return deleteNotification();
	}
   
    async function startVerfication(){
    	try{
    		console.log(process.env.WIFI_IP_ADDRESS);
	    	const response = await axios.get(`${process.env.WIFI_IP_ADDRESS}/verify`);
			res.status(200).end(`${response.data}`);
    	}catch(err){
    		res.status(400).end('error');
    	}
    }
	async function validate(){
		await nodemcuController.addSuccess(req,res);
	}
	async function deleteNotification(){
		await nodemcuController.deleteSuccess(req,res);
	}
}