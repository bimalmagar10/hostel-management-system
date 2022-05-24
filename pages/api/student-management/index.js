//import {studentController} from "../../../utils/controller";
import studentController from "./../../../controllers/studentController";
export default function handler(req,res){
	switch(req.method){
		case 'GET':
		return getAllStudents();
		case 'POST':
		return createStudent();
		default:
		return res.status(405).end(`Method ${req.method} not allowed!!`);
	}

	async function getAllStudents(){
		await studentController.getAllStudents(req,res);
        // const students  = studentController.getAllStudents();
        // return res.status(200).json(students);
	}

	async function createStudent(){
		await studentController.createStudent(req,res);
		// try {
		// 	studentController.createStudent(req.body);
		// 	return res.status(200).json({});
		// } catch(error) {
  //           return res.status(500).json({msg:error});
		// }
	}
}