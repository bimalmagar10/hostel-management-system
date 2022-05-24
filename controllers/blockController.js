import Block from "./../models/blockModel";
const createBlock = async (req,res) => {
		try {
			const block = await Block.create(req.body);
			res.status(201).json({
				status:'success',
				data:block
			})
		}catch(err){
			res.status(400).json({status:'error'});
		}
};
const getBlocks = async (req,res) => {
	try {
		const blocks = await Block.find({});
		res.status(200).json({
			status:'success',
			data:blocks
		});
	} catch(err){
		res.status(400).json({status:'error'});
	}
};

const blockController = {
	createBlock,
	getBlocks
};

export default blockController;