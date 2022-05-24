import Layout from "../../../components/Layout";
import {decodeCookie} from "../../../utils/utils";
import services from "../../../utils/services";
import {updateSettings,AUTH_URL_ADMIN,AUTH_URL_LOGOUT} from "../../../utils/helpers";
import {useRouter} from "next/router";
import Head from "next/head";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Heading,
	Button,
	Flex,
	useToast,
	Center,
	Box
} from "@chakra-ui/react";
import {Formik,Form,Field} from "formik";
const handleResponse = (res) => {
	return res.text().then(text => {
			const data = text && JSON.parse(text);
			if(!res.ok) {
     			throw  new Error(data.msg ?? res.statusText);
			}
         return data;
	});
}
const pathReq = (body) => {
    const requestOptions = {
    	headers:{'Content-Type':'application/json'},
    	method:'PATCH',
    	body:JSON.stringify(body)

    }
    return fetch(AUTH_URL_ADMIN,requestOptions).then(handleResponse);
};

export default function Settings(props){
	const admin = decodeCookie(props.MyJWT);
	console.log("from settings admin",admin)
    const router = useRouter();
    const toast = useToast();

	async function handleSubmit(values,{setSubmitting}) {
		try {
			const attr = {...values,id:admin.id};
			const response = await pathReq(attr);
			if(response.status === "success"){
				toast({
	        		title:'Password updated successfully!!',
	        		status:'success',
	        		variant:'top-accent',
	        		isClosable:true,
	        		duration:2000
	        	});
			}
			const res = await services.getAll(AUTH_URL_LOGOUT) 
			if(res.status === "success"){
				toast({
		    			title:"You're logged out!",
		    			status:'success',
		    			variant:'top-accent',
		    			isClosable:true,
		    			duration:1000
	    		});
				router.push('/auth/login');
			}
		}catch(err){
			toast({
					title:`${err}`,
					status:'error',
					duration:2000,
					isClosable:true,
					variant:'top-accent'
			})
			setSubmitting(false);
		}
       
		// alert(JSON.stringify(attr,null,2));
	};
	function handleCancel(e) {
		e.preventDefault();
		router.push("/dashboard");
	}
	return (
		<Layout>
		   <Head><title>Admin - Settings</title></Head>
		   <Box height="100%" position="relative">
		    <Flex
		        position="absolute"
		        top="50%"
		        left="50%"
		        transform="translate(-55%,-65%)" 
		        p={10}
		    	width="25vw"
		    	direction="column" 
		    	border="1px solid"
		    	borderColor="gray.400"
		    	rounded={5}
		    >
			<Heading mb={10}>Update Admin Password</Heading>
			<Formik
			    initialValues={{
			    	currentPassword:"",
			    	password:"",
			        confirmPassword:""
			    }}
			    onSubmit={handleSubmit}
			>
				{
					({isSubmitting}) => (
						<Form>
						     {
						     	updateSettings.map(({id,placeholder},index) => (
						     	<Box mb={6}>
						          <Field name={id} key={index}>
						            {({ field, form }) => {
						            	   const {errors,touched} = form;
	 										return (
		 										<FormControl isInvalid={errors[id] && touched[id]}>
									                <FormLabel fontSize="1.4rem" htmlFor={id}>{placeholder}:</FormLabel>
									                <Input {...field} size="lg" fontSize="1.4rem" id={id} placeholder={placeholder} type="password"/>
									                <FormErrorMessage fontSize="1.2rem">{errors[id]}</FormErrorMessage>
								              	</FormControl>
							              	);
						            }}
						          </Field>
						         </Box>

						     	))
						     }
						     <Flex mt={10} align="center">
					          <Button
					            size="lg"
					            fontSize="1.4rem"
					            mr={4}
					            colorScheme='teal'
					            isLoading={props.isSubmitting}
					            type='submit'
					          >
					            Submit
					          </Button>
					          <Button
					            fontSize="1.4rem"
					            colorScheme='blue'
					            variant="link"
					            onClick={handleCancel}
					          >
					            Cancel
					          </Button>
					         </Flex>
					    </Form>
					)
				}
			</Formik>
			</Flex>
			</Box>
		</Layout>
	);
}

export async function getServerSideProps(context){
	return {
		props:context.req.cookies
	}
}