//import {roomController} from "../../../utils/controller";
import dbConnect from "./../../../utils/dbConnect";
import roomController from "./../../../controllers/roomController";
dbConnect();

export default function handler(req,res){
	switch(req.method){
		case 'GET':
		return getRooms();
		case 'POST':
		return addRoom();
		default:
		return res.status(405).end(`Method ${req.method} not allowed!!`);
	}

	async function getRooms(){
		//const rooms =  roomController.getAll();
		await roomController.getRooms(req,res);
		
	}
	
    async function addRoom(){
    	await roomController.createRoom(req,res);
		// try{
		// 	// roomController.createRoom(req.body);
		// 	// return res.status(200).json({});
		// } catch(error){
		// 	console.log("this is error",error);
		// 	return res.status(500).json({msg:error});
		// }
	}
}