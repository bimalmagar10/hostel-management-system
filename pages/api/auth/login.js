import authController from "./../../../controllers/authController";
import dbConnect from "./../../../utils/dbConnect";
dbConnect();
export default async function handler(req,res){
	switch(req.method){
		case 'GET':
		return nodemcualert();
		case 'POST':
		return login();
		default:
		res.status(405).end(`Method ${req.method} not allowed!!`);
	}

	async function login(){
		await authController.login(req,res);
	}
	 function nodemcualert(){
	 	res.status(200).json({msg:"Nodemcu baata daata aayo muji ho!!!!"});
	 }
}