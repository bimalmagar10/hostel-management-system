import axios from "axios";
export default function handler(req,res){
	switch(req.method){
		case 'POST':
		return enroll();
	}

	async function enroll(){
		const handleResponse = await axios.post(`${process.env.WIFI_IP_ADDRESS}/enroll`,req.body);
		res.status(200).end(`Fingerprint Ready`);
	}
}