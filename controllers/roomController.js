import Room from './../models/roomModel';

const getRooms = async (req,res) => {
	try{
		const rooms = await Room.find({});
	     res.status(200).json({
	    	status:'success',
	    	data:rooms
	    })
	} catch(err){
		res.status(400).json({
			status:'error'
		});
	}
	
};

const getRoomById = async (req,res) => {
	const {query:{id}} = req;
	try {
		const room = await Room.findById(id);
		if(!room) {
			return res.status(400).json({status:'error',msg:'Room not found'});
		}
		res.status(200).json({
			status:'success',
			data:room
		});
	}catch(err){
		res.status(400).json({status:'error'});
	}
};

const createRoom = async (req,res) => {
	try {
		const room = await Room.create(req.body);
		res.status(201).json({
			status:'success',
			data:{room}
		});
	}catch(err){
		console.log(err)
		res.status(400).json({status:'error'});
	}
};

const deleteRoom = async (req,res)=> {
	const {
		query:{id}
	} = req;
	try {
		const room = await Room.findByIdAndDelete(id);
		if(!room) {
			return res.status(400).json({status:'error',msg:"Room not found"});
		}
		res.status(204).end();
	} catch(err) {
		res.status(400).json({status:'error'});
	}
};
const updateRoom = async (req,res) => {
	const {query:{id},body} = req;
	try {
		const room = await Room.findByIdAndUpdate(id,body,{
			new:true,
			runValidators:true
		});
		if(!room) {
			return res.status(400).json({
				status:'error',msg:'Room not found'
			});
		}
		res.status(200).json({
			status:'success',
			data:room
		});
	} catch(err){
		res.status(400).json({status:'error'});
	}
};
const roomController = {
	getRooms,
	createRoom,
	deleteRoom,
	getRoomById,
	updateRoom
};

export default roomController;
