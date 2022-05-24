import Student from "./../models/studentModel";

const getAllStudents = async (req,res) => {
   try {
   	  const students = await Student.find({});
   	  res.status(200).json({
   	  	status:'success',
   	  	data:students
   	  });
   } catch(err){
   	res.status(400).json({status:'error'});
   }
};
const getStudentById = async (req,res) => {
	const {query:{id}} = req;
	try {
		const student = await Student.findById(id);
		if(!student) {
			return res.status(400).json({
				status:"error",
				msg:"Student not found"
			});
		}
		res.status(200).json({
			status:"success",
			data:student
		});
	} catch(err) {
		res.status(400).json({status:"error"});
	}
};

const createStudent = async (req,res) => {
	try {
		if(!req.body) {
			return res.status(400).json({
				status:"error",msg:"Please provide all informations"
			})
		}
		const student = await Student.create(req.body);
		res.status(204).end();
	} catch(err) {
		res.status(400).json({status:'error'});
	}
};

const deleteStudent =  async (req,res) => {
	const {query:{id}}= req;
	try {
        const student = await Student.findByIdAndDelete(id);
        if(!student){
        	return res.status(400).json({status:"error"});
        }
        res.status(204).end();
	} catch(err) {
		res.status(400).json({status:'error'});
	}
};
const updateStudent = async (req,res) => {
	const {query:{id},body} = req;
	try {
		const student = await Student.findByIdAndUpdate(id,body,{
			new:true,
			runValidators:true
		});
		if(!student) {
			return res.status(400).json({
				status:"error",
				msg:"Student not found"
			});
		}
		res.status(200).json({
			status:"success",
			data:student
		});
	}catch(err){
		res.status(400).json({status:'error'});
	}
};

const studentController = {
	getAllStudents,
	createStudent,
	deleteStudent,
	getStudentById,
	updateStudent
};
export default studentController;