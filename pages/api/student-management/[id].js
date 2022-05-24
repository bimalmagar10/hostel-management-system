import studentController from "./../../../controllers/studentController";
// import {studentController} from "../../../utils/controller";
export default function handler(req,res){
	switch(req.method){
		case 'DELETE':
		return deleteStudent();
		case 'GET':
		return getStudentById();
		case 'PATCH':
		return updateStudent();
		default:
		return res.status(405).end(`Method ${req.method} not allowed!!`);
	}

	async function deleteStudent(){
			await studentController.deleteStudent(req,res);
			// return res.status(200).json({});
	}

	async function getStudentById(){
		await studentController.getStudentById(req,res);
		// const student = studentController.getStudentById(req.query.id);
		// return res.status(200).json(student);
	}
	async function updateStudent(){
		await studentController.updateStudent(req,res);
		// try {
		// 	studentController.updateStudent(req.query.id,req.body);
		// 	return res.status(200).json({});
		// } catch(error){
		// 	console.log(error);
		// 	return res.status(500).json({msg:error});
		// }
	}
}