import {Formik,Form,Field} from "formik";
import axios from "axios";
import useSWR from 'swr';
import Head from "next/head";

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
	useToast,
	Heading,
	Flex
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
const fetcher = url => axios.get(`http://localhost:3000/${url}`).then(res => res.data);
export default function StudentValidation(props){
	const toast = useToast();
 	const {data,error} = useSWR('api/nodemcu/verifysuccess',fetcher,{
 		refreshInterval:(data) => {
 			console.log(data);
 			return 2000;
 		}
 	});
 	if(data){
 		const {data:notification} = data;
	 	if(notification && notification.length){
	 		if(notification[0].fingerprintId === '0' || !notification[0].fingerprintId){
	 			toast({
	    			title:`${notification[0].message}`,
	    			status:'error',
	    			variant:'top-accent',
	    			isClosable:true,
	    			duration:2000
    			});
	 		} else {
	 			toast({
    				title:`${notification[0].message}`,
	    			status:'success',
	    			variant:'top-accent',
	    			isClosable:true,
	    			duration:5000
    			});
	 		}
	 		console.log("stop deletion");
	 		return;
	 		
	 		axios.delete('http://localhost:3000/api/nodemcu/validation').then(res => {
	 			console.log("Hurray!!");
	 		});
	 	}
 	}
 	
 	
	return (
		<Layout>
		  <Head><title>Student Validation</title></Head>
		  <Flex justify="center" align="center" direction="column">
		    <Heading mb="3rem">Student Verification</Heading>
			<Formik
			  initialValues={{
			  	pin:""
			  }}
			  onSubmit={async (values,{setSubmitting,resetForm}) => {
			  	try {
			  		const res = await axios.get("/api/nodemcu/validation");
			  		if(res.status == 200){
			  			toast({
			        		title:res.data,
			        		status:'success',
			        		variant:'top-accent',
			        		isClosable:true,
			        		duration:5000
		        		});
				  		setSubmitting(false);
			        	resetForm();
			  		}
			  	}catch(err){
			  		toast({
			        		title:`${err}`,
			        		status:'error',
			        		variant:'top-accent',
			        		isClosable:true,
			        		duration:3000
		        		});
		        	setSubmitting(false);
			  	}
			  }}
			>
				{
					(props) => (
						<Form>

							{
								({field,form}) => (
									<FormControl isInvalid={form.errors.pin && form.touched.pin}>
										<Input size="lg" {...field} id="pin" fontSize="1.4rem" placeholder="Enter 2 for validation" type="hidden"/>
										<FormErrorMessage fontSize="1.4rem">{form.errors.pin}</FormErrorMessage>
									</FormControl>
								)
							}
							<Button
							    fontSize="1.6rem"
							    h="6rem"
							    w="18rem"
							    isLoading={props.isSubmitting}
								type="submit"
								colorScheme="teal"
							>
							  Start Verification
							</Button>
						</Form>
					)
				}
				</Formik>
			</Flex>
		</Layout>
	);
}
