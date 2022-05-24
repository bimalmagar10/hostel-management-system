import {useEffect} from "react";
import {Formik,Field,Form} from "formik";
import {StudentRegisterFields,facultyOptions} from "../utils/helpers";
import {studentRegisterValidation} from "../utils/validate";
import MySelect from "./MySelect";
import * as Yup from "yup";
import {
	SimpleGrid,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	HStack,
	useToast
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import services from "../utils/services";
import {STUDENTS_URL,stdEditFields} from "../utils/helpers";
import {useRouter} from "next/router";
const fetcher = url => axios.get(`http://localhost:3000/${url}`).then(res => res.data);

const AddEditStudentForm = ({props}) => {
	const router = useRouter();
	const student = props?.student;
	const isAddMode = !student;
	const toast = useToast();
	if(isAddMode){
		const {data,error} = useSWR("api/nodemcu/storefingerprint",fetcher,{
			refreshInterval:2000
		});
		if(data){
			const {data:messages} = data;
			if(messages && messages.length){
				toast({
	    			title:`${messages[0].message}`,
	    			status:'success',
	    			variant:'top-accent',
	    			isClosable:true,
	    			duration:2000
    			});
    			axios.delete('http://localhost:3000/api/nodemcu/storefingerprint').then(res => {
	 				console.log("hurray!!");
	 			});
			}
		}
	}
	function handleSubmit(values,{setSubmitting}){
		   isAddMode ? 
		   registerStudent(values,setSubmitting):
		   editStudent(values,setSubmitting);
			
    }
   
    function registerStudent(params,setSubmitting){
    	services.create(STUDENTS_URL,params).then(() => {
    		toast({
    			title:'Student registered successfully',
    			status:'success',
    			variant:'top-accent',
    			isClosable:true,
    			duration:3000
    		});
    		router.push(`/dashboard/students/student-management/${params.faculty}`);
    	}).catch(error => {
    		toast({
    			title:`${error}`,
    			status:'error',
    			variant:'top-accent',
    			isClosable:true,
    			duration:3000
    		})
    		setSubmitting(false);
    	});
    }

    function editStudent(params,setSubmitting){
    	services.update(STUDENTS_URL,student._id,params).then(() => {
    		toast({
    			title:'Student updated successfully',
    			status:'success',
    			variant:'top-accent',
    			isClosable:true,
    			duration:3000
    		});
    		router.push(`/dashboard/students/student-management/${params.faculty}`);
    	}).catch(error => {
    		toast({
    			title:`${error}`,
    			status:'error',
    			variant:'top-accent',
    			isClosable:true,
    			duration:3000
    		});
    		setSubmitting(false);
    	})
    }

	return (
			<Formik
			   initialValues={{
			   	fullname:'',
			   	faculty:'',
			   	rollnumber:'',
			   	dob:'',
			   }}
			   validationSchema={studentRegisterValidation}
			   onSubmit={handleSubmit}
			>
				{
					(props) => {
						useEffect(() => {
							if(!isAddMode){
								stdEditFields.forEach(field => {
									props.setFieldValue(field,student[field],false);
								})
							}
						},[])
						return (
						<Form>
						  <SimpleGrid columns={2} spacingX="4rem" spacingY="1.2rem">
						    {
						    	StudentRegisterFields.map(({label,name},index) => (
						    		<Field name={name} key={index}>
										{
											({field,form}) => (
												<FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
													<FormLabel htmlFor={name} fontSize="1.6rem">{label}</FormLabel>
													<Input size="lg" {...field} id={name} fontSize="1.4rem" placeholder={name === "dob" ? "MM/DD/YYYY in (A.D.)" :null}/>
													<FormErrorMessage fontSize="1.4rem">{form.errors[name]}</FormErrorMessage>
												</FormControl>
											)
										}
									</Field>
						    	))
						    }
						    <MySelect label="Faculty" name="faculty" placeholder="Select Faculty">
						        {
						        	facultyOptions.map(({value,option},i) =>(
						        		<option key={i} value={value}>{option}</option>
						        	))
						        }
						    </MySelect>
						    {
						    	isAddMode && (

						    <Formik
						      initialValues={{
						      	fingerprint:""
						      }}
						      validationSchema={Yup.object({
						      	fingerprint:Yup.number('Must be a number')
						      	.lessThan(128,'Must be between 0-127')
						      	.positive('Must be positive')
						      	.required('Required!!')
						      })}
						      onSubmit={async (values,{setSubmitting}) => {
						      	props.setFieldValue("fingerprint",values.fingerprint,false);
						      	if(values.fingerprint){
						      		const params =  {"id":values.fingerprint};
						      		try {
						      			const res = await axios.post("/api/nodemcu/enrollment",params);
							  	 		if(res.status === 200){
							  	 			toast({
								        		title:res.data,
								        		status:'success',
								        		variant:'top-accent',
								        		isClosable:true,
								        		duration:3000
							        		});
							        		setTimeout(() => {
							        			toast({
									        		title:"Remove Finger and place the same finger again",
									        		status:'success',
									        		variant:'top-accent',
									        		isClosable:true,
									        		duration:2000
							        			});
							        			setSubmitting(false);
							        		},5000);
							        	   	
							  	 		}
						      		}catch(err){
						      			toast({
											title:`${err}`,
											status:'error',
											duration:3000,
											isClosable:true,
											variant:'top-accent'
										})
										setSubmitting(false);
						      		}
						      	}
						      }}
						    >
						       {
						       	(innerForm) => (
						       	<Form>
								    <Field name="fingerprint" mb=".5rem">
												{
													({field,form}) => (
														<FormControl isInvalid={form.errors.fingerprint && form.touched.fingerprint} isRequired>
															<FormLabel htmlFor="fingerprint" fontSize="1.6rem">Fingerprint ID</FormLabel>
															<Input size="lg" {...field} id="fingerprint" fontSize="1.4rem" placeholder="Enter fingerprint ID from 1 to 150"/>
															<FormErrorMessage fontSize="1.4rem">{form.errors.fingerprint}</FormErrorMessage>
														</FormControl>
													)
												}
									</Field>
									<Button isLoading={innerForm.isSubmitting} colorScheme="teal" onClick={() => innerForm.handleSubmit()}>Add Fingerprint</Button>
								</Form>
								)
						       }
							</Formik>
						    )
						    }
						    </SimpleGrid>
						    <HStack align="center" mt="2rem">
								<Button
								    p="1.4rem" 
								    fontSize="1.3rem"
									type="submit"
									colorScheme="teal"
									isLoading={props.isSubmitting}
								>
									Submit
								</Button>
								{
									!isAddMode && (
										<Button
										 display="inline"
										 fontSize="1.3rem"
										 variant="link"
										 colorScheme="blue"
										  onClick={() =>  router.push(`/dashboard/students/student-management/${student.faculty}`)}
										>
											Cancel
										</Button>
									)
								}
								
							</HStack>
						</Form>
					);
					}
				}
			</Formik>
	);
};

export default AddEditStudentForm;