import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	SimpleGrid
} from "@chakra-ui/react";
import {Formik,Form,Field} from "formik";
import * as Yup from "yup";
import {css} from "@emotion/react";
import {FormItems} from "../utils/helpers";

export default function AddRoomForm() {
	return (
		<Formik
		   initialValues={{name:'bimal'}}
		   validationSchema={
		   	Yup.object({
		   		roomName:Yup.string()
		   		.max(5,'Must be 5 character or less')
		   		,
		   		blockName:Yup.string()
		   		.matches(/^[aA-zZ\s]+$/,"Only alphabets are allowed")
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
		   		"student-1":Yup.string()
		   		.matches(/^[A-Za-z0-9]+/g,'Roll number is invalid')
		   		.max(12,'not more than 12 chracters')

		   	})
		   }
		   onSubmit={(values,{setSubmitting}) => {
		   	setTimeout(() => {
 		   		alert(JSON.stringify(values,null,2));
		   		setSubmitting(false);
		   	},1000)
		   }}
		>
		  {(props) => (
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
		  	  	<Button
		  	  	  mt="2rem"
		  	  	  size="lg"
		  	  	  colorScheme='teal'
		  	  	  type="submit"
		  	  	  isLoading={props.isSubmitting}
		  	  	>
		  	  		Submit
		  	  	</Button>
		  	  </Form>
		  	)}
		</Formik>
	);
}