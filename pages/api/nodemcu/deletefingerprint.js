import nodemcuController from "./../../../controllers/nodemcuController";
import axios from "axios";
export default function handler(req,res){
	switch(req.method){
		case 'GET':
		return resetSensor();
		case 'POST':
		return deleteFromSensor();
	}

	async function deleteFromSensor(){
		try{
			const finger = await axios.post(`${process.env.WIFI_IP_ADDRESS}/delete`,req.body);
			console.log("from server",finger);
			res.status(200).end(`Deleted finger from database`);
	    }catch(err){
		    console.log("ERROR!!");
		    res.status(400).end("Error!!");
	   }
	}

	async function resetSensor(){
		try {
			const finger = await axios.get(`${process.env.WIFI_IP_ADDRESS}/reset`);
			console.log("Sensor has been reset",finger);
			res.status(200).end(`${finger.data}`);
		}catch(err){
			console.log('ERROR!!');
			res.status(400).end("Error");
		}
	}
}