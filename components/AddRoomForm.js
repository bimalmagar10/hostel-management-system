import {useEffect} from "react";
import {roomEditFields} from "../utils/helpers";
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	SimpleGrid,
	useToast,
	HStack
} from "@chakra-ui/react";
import {Formik,Form,Field} from "formik";
import * as Yup from "yup";
import {css} from "@emotion/react";
import {FormItems,ROOM_URL} from "../utils/helpers";
import services from "../utils/services";
import {useRouter} from "next/router";
 
export default function AddRoomForm({props}) {
	const toast = useToast();
	const router = useRouter();
    const room = props?.room;
    const isAddMode = !room;
	function handleSubmit(values,{setSubmitting}) {
		isAddMode ?
		createRoom(values,setSubmitting):
		updateRoom(room._id,values,setSubmitting);
	}

	function createRoom(params,setSubmitting){
		const {students} = params;
		const lowercased = students.map(std => std.toLowerCase());
		const newParams = {...params,students:lowercased};
        services.create(ROOM_URL,newParams).then(() => {
        	toast({
        		title:'Room added successfully!!',
        		status:'success',
        		variant:'top-accent',
        		isClosable:true,
        		duration:5000
        	})
        	router.push(`/dashboard/room-management/block/${params.blockName}`);
        	
        }).catch(err => {
        	toast({
				title:`${err}`,
				status:'error',
				duration:3000,
				isClosable:true,
				variant:'top-accent'
			})
			setSubmitting(false);
        });
	}
	function updateRoom(id,values,setSubmitting){
		services.update(ROOM_URL,id,values).then(() => {
			toast({
				title:'Room updated successfully!',
				status:'success',
				variant:'top-accent',
				isClosable:true,
				duration:5000
			});
			router.push(`/dashboard/room-management/block/${values.blockName}`);
			
		}).catch(err => {
			toast({
				title:`${err}`,
				status:'error',
				duration:3000,
				isClosable:true,
				variant:'top-accent'
			})
			setSubmitting(false);
		});
	}

	return (
		<Formik
		   initialValues={{
		   	roomName:'',
		   	blockName:'',
		   	tables:2,
		   	chairs:2,
		   	beds:2,
		   	wardrobe:2,
		   	students:['','']
		   }}
		   validationSchema={
		   	Yup.object({
		   		roomName:Yup.string()
		   		.max(5,'Must be 5 character or less')
		   		,
		   		blockName:Yup.string()
		   		.matches(/^[aA-zZ\s]+$/,"Only alphabets are allowed")
		   		.oneOf(['A','B','C','D'],'Available blocks are A,B,C,D')
		   		.max(1,'Must be one alphabet')
		   		,
		   		tables:Yup.number('Must be a number')
		   		.lessThan(4,'Must not be greater than four')
		   		.integer('Must be an integer')
		   		.positive('Must be positive'),
		   		chairs:Yup.number('Must be a number')
		   		.lessThan(4,'Must not be greater than four')
		   		.integer('Must be an integer')
		   		.positive('Must be positive'),
		   		beds:Yup.number('Must be a number')
		   		.lessThan(4,'Must not be greater than four')
		   		.integer('Must be an integer')
		   		.positive('Must be positive'),
		   		wardrobe:Yup.number('Must be a number')
		   		.lessThan(4,'Must not be greater than four')
		   		.integer('Must be an integer')
		   		.positive('Must be positive'),
		   		students:Yup.array()
		   		.of(Yup.string()
		   			.matches(/^[A-Za-z0-9]+/g,'Roll number is invalid')
		   			.max(12,'not more than 12 chracters')
		   		)
		   		.required('Required')
		   	})
		   }
		   onSubmit={handleSubmit}
		>
		  {(props) => {
		  	useEffect(() => {
		  		if(!isAddMode){
		  			roomEditFields.forEach(field => {
		  				if(field === 'students') {
		  					room[field].forEach((value,index) => {
		  					  props.setFieldValue(`${field}[${index}]`,value,false);
		  					})
		  				} else {
		  					  props.setFieldValue(field,room[field],false);
		  			    }
		  			})
		  		}
		  	}, [])

		  	return (
		  	  <Form>
		  	    <SimpleGrid columns={2} spacingX="5rem" spacingY="1rem">
			  	    {
			  	    	FormItems.map(({label,name},index) =>(
			  	    		<Field name={name} key={index}>
					  	  	   {({field,form}) =>{
					  	  	   	const {errors,touched} = form;
					  	  	   	return (
					  	  	   	  <FormControl isInvalid={errors[name] && touched[name]} isRequired>
					  	  	   	  	 <FormLabel htmlFor={name} fontSize="1.6rem">{label}</FormLabel>
					  	  	   	  	 <Input size="lg" {...field} id={name} placeholder={label.toLowerCase().includes('student') ? 'Student roll no e.g PAS074BEX013' : label} fontSize="1.4rem"/>
					  	  	   	  	 <FormErrorMessage fontSize="1.4rem">{errors[name]}</FormErrorMessage>
					  	  	   	  </FormControl>)

					  	  	   	}
					  	  	}
			  	  			</Field>
			  	    	))
			  	    }
		  	    </SimpleGrid>
		  	    <HStack align="center" mt="2rem">
		  	  	<Button
		  	  	  p="1.3rem"
		  	  	  fontSize="1.3rem"
		  	  	  colorScheme='teal'
		  	  	  type="submit"
		  	  	  isLoading={props.isSubmitting}
		  	  	>
		  	  		Submit
		  	  	</Button>
		  	  	{!isAddMode && (
		  	  		<Button
		  	  		   variant="link"
		  	  		   fontSize="1.3rem"
		  	  		   colorScheme="blue"
		  	  		   onClick={() => router.push(`/dashboard/room-management/block/${room.blockName}`)}
		  	  		>
		  	  			Cancel
		  	  		</Button>
		  	  	)}
		  	  	</HStack>
		  	  </Form>
		  	  )
		  	}}
		</Formik>
	);
}