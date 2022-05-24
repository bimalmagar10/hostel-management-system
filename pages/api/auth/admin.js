import authController from "./../../../controllers/authController";
import dbConnect from "./../../../utils/dbConnect";
dbConnect();
export default async function handler(req,res){
	switch(req.method){
		case 'POST':
		return add();
		case 'PATCH':
		return updateAdminPassword();
		default:
		res.status(405).end(`Method ${req.method} not allowed!!`);
	}

	async function add(){
		return await authController.addAdmin(req,res);
	}

	async function updateAdminPassword(){
		return await authController.updatePassword(req,res);
	}
}