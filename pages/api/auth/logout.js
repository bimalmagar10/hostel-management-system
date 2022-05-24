import authController from "./../../../controllers/authController";
export default async function handler(req,res){
	switch(req.method){
		case 'GET':
		return logout();
		default:
		res.status(405).end(`Method ${req.method} not allowed!!`);
	}

	async function logout(){
		await authController.logout(req,res);
	}
}