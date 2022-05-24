import mongoose from 'mongoose';
const connections = {};
const DB= process.env.DATABASE.replace('<PASSWORD>',process.env.DB_PASSWORD);
const dbConnect = async () => {
	if(connections.isConnected){
		return;
	}

	const result = await mongoose.connect(DB);
	connections.isConnected = result.connections[0].readyState;
	console.log('DB connection is successful');
};

export default dbConnect;