import blockController from "./../../../controllers/blockController";
export default function handler(req,res){
	switch(req.method){
		case 'GET':
		return getBlocks();
		case 'POST':
		return createBlock();
		default:
		return res.status(405).end(`Method ${req.method} not allowed!`);
	}

	async function getBlocks(){
		await blockController.getBlocks(req,res);
	}
	async function createBlock() {
		await blockController.createBlock(req,res);
	}
}