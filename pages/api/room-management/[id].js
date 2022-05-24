//import {roomController} from "../../../utils/controller";
import roomController from "./../../../controllers/roomController";

export default function handler(req,res) {
	switch(req.method){
		case 'DELETE':
		return deleteRoom();
		case 'GET':
		return getRoomById();
		case 'PATCH':
		return updateRoom();
		default:
		return res.status(405).end(`Method ${req.method} not allowed!!!`);
	}

	async function deleteRoom(){
		await roomController.deleteRoom(req,res);
		// roomController.deleteRoom(req.query.id);
  //       return res.status(200).json({});
	}

	async function getRoomById(){
		await roomController.getRoomById(req,res);
		// const room = roomController.getById(req.query.id);
		// return res.status(200).json(room);
	}
	async function updateRoom(){
		await roomController.updateRoom(req,res);
		// roomController.updateRoom(req.query.id,req.body);
		// return res.status(200).json({});
	}
}