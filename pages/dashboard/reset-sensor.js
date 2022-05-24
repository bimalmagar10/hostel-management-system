import Head from "next/head";
import {Formik,Form,Field} from "formik";
import axios from "axios";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
	useToast,
	Center,
	Heading,
	Flex
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
export default function StudentValidation(props){
	const toast = useToast();
	return (
		<Layout>
		   <Head>
		   	 <title>Reset Sensor</title>
		   </Head>
		  <Flex justify="center" align="center" direction="column">
		    <Heading mb="3rem">Reset Sensor</Heading>
			<Formik
			  initialValues={{
			  	pin:""
			  }}
			  onSubmit={async (values,{setSubmitting,resetForm}) => {
			  	try {
			  		const res = await axios.get("/api/nodemcu/deletefingerprint");
			  		console.log(res);
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
								colorScheme="red"
							>
							 Reset Sensor
							</Button>
						</Form>
					)
				}
				</Formik>
			</Flex>
		</Layout>
	);
}
