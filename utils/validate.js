import * as Yup from "yup";
let regex = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;
let now= new Date();
const studentRegisterValidation = Yup.object({
     fullname:Yup.string()
     .max(25,'Your name is long')
     .required('Required'),
     rollno:Yup.string()
     .matches(/^[A-Za-z0-9]+/g,'Invalid roll no')
     .required('Required'),
     phone:Yup.number("Must be number")
     .integer('Must be integer')
     .positive('Must be positive')
     .required('Required'),
     pphone:Yup.number("Must be number")
     .integer('Must be integer')
     .positive('Must be positive')
     .required('Required'),
     email:Yup.string()
     .email("Invalid email address")
     .required('Required'),
     address:Yup.string()
     .required('Required'),
     fathersName:Yup.string()
     .max(40,"Too long")
     .required('Required'),
     mothersName:Yup.string()
     .max(40,"Too long"),
     faculty:Yup.string()
     .oneOf(['BEX','BCT','BCE','BGE','BME','BEL','BAM'],'Invalid faculty')
     .required('Required'),
     dob:Yup.string().test(
     	"date-format-check",
     	"Date format is invalid",
     	(value) => {
     		if(value){
				let birthYear = parseInt(value.split("/")[2]);
				if(!regex.test(value) || birthYear > now.getFullYear()) {
					return false;
				}
				return true;
         	}
     	}
     )
     .required('Required')
});

export {studentRegisterValidation};