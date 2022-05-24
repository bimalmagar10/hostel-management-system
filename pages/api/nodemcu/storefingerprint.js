import notificationController from "./../../../utils/notificationController";
import nodemcuController from "./../../../controllers/nodemcuController";

export default function handler(req,res){
	switch(req.method){
		case 'GET':
		return getStoreMsgs();
		case 'POST':
		return store();
		case 'DELETE':
		return deleteFingerprintMsg();
	}

	async function store(){
		await nodemcuController.storeFingerprint(req,res);
	}
	async function getStoreMsgs(){
		const message = notificationController.getFingerprintMessages();
		res.status(200).json({
			data:message
		});
	}
	async function deleteFingerprintMsg(){
		await nodemcuController.deleteFingerprintMsg(req,res);
	}
}