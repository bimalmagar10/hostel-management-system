import notificationController from "./../../../utils/notificationController";
export default function handler(req,res){
	switch(req.method){
		case 'GET':
		return getNotification();
	}

	async function getNotification(){
		const notification = notificationController.getAll();
		res.status(200).json({
			data:notification
		});
	}
}