import {useEffect,useState} from "react";
import UserProfileCard from "./../../components/UserProfileCard";
import UserDetails from "./../../components/UserDetails";
import Layout from "../../components/Layout";
import {
	Stack,
	Input,
	IconButton,
	useColorModeValue,
	Heading,
	FormControl,
	FormLabel,
	useToast,
	Center,
	Text
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import Head from "next/head";
import services from "./../../utils/services";
import {ROOM_URL,STUDENTS_URL} from "./../../utils/helpers";
import {Formik,Form,Field} from "formik";
import {findStudent} from "./../../utils/utils";
export default function StudentDetails(){
    const [studentDetails,setStudentDetails] = useState(null);
    const toast = useToast();
		const handleSubmit = (values,{setSubmitting,setFieldValue}) => {
			findStudent(values.searchName).then(res => {
				setFieldValue('searchName','',false);
				setStudentDetails(res);

			}).catch(err => {
				toast({
					title:`${err}`,
					status:'error',
					duration:2000,
					variant:'top-accent',
					isClosable:true
				});
				setStudentDetails(null);
				setSubmitting(false);
			})
			
		};
	// useEffect(() => {
	// 	async function getDetails(){
	// 		const rooms = await services.getAll(ROOM_URL);
	// 		const students = await services.getAll(STUDENTS_URL);
	// 		const newDB = {
	// 			rooms,students
	// 		};
	// 		const student = students.find(x => x.rollno.toLowerCase() === 'pas074bex013'.toLowerCase());
	// 		const [room] = rooms.filter(x=> x.students.includes(student.rollno.toLowerCase()));
	// 		const newDB ={
	// 			student,
	// 			room
	// 		};
	// 		console.log("from async DB",newDB);
	// 	}
	// 	getDetails();
	// },[])
	return (
		<Layout>
		<Head>
		  <title>Student Details</title>
		</Head>
		<Heading mb="5rem" textTransform="uppercase" fontSize="3rem" fontFamily="inherit">Student Details</Heading>
           <Formik
             initialValues={{searchName:""}}
             onSubmit={handleSubmit}
           >
             {
             	(props) => (
             		<Form>
             		<Stack direction="row" justify="center" spacing={0} align="stretch" mb="5rem">
             		  	<Field name="searchName">
             		  	   {
             		  	   	({field,form}) => (
			             		<FormControl maxW="50rem">
						        	<Input
						        	{...field}
						        	size="lg"
						        	p="2rem 1.5rem"
						        	fontSize="1.6rem"
						        	maxW="50rem" 
						        	placeholder="Search students by roll number"
						        	rounded={false} bg={useColorModeValue('white','gray.700')}
						        	/>
						        </FormControl>
             		  	   	)
             		  	   }
				        </Field>
			        	<IconButton 
			        	type="submit"
			        	p="2rem 1.5rem"
			        	size="lg"
			        	fontSize="1.6rem"
			        	borderTop="1px"
			        	borderRight="1px"
			        	borderBottom="1px" 
			        	borderColor={useColorModeValue('gray.200','gray.600')} 
			        	aria-label="Search Students" 
			        	icon={<SearchIcon/>} 
			        	borderRadius={0}/>
             		</Stack>
             		</Form>
             	)
             }
        	</Formik>
        

		<Stack justify="space-between" align="flex-start" direction="row" spacing="2rem">
			{
				studentDetails && (
					<>
						<UserProfileCard details={studentDetails}/>
						<UserDetails  details={studentDetails}/>
					</>
				)
			}
		</Stack>
		{
			!studentDetails && <Center><Text fontSize="2rem" fontWeight="700">No results to display</Text></Center>
		}
		</Layout>
	);
}
