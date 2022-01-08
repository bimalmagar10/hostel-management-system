import {
	Heading,
	FormControl,
	Input,
	FormErrorMessage,
	Button,
	FormLabel,
	SimpleGrid,
	Select
} from "@chakra-ui/react";
import {Formik,Field,Form,useField} from "formik";
import * as Yup from "yup";
import {StudentRegisterFields,facultyOptions} from "../../utils/helpers";
import {studentRegisterValidation} from "../../utils/validate";
import MySelect from "../../components/MySelect";
console.log(studentRegisterValidation);
export default function StudentRegister() {
	return (
		<>
			<Heading fontSize="3rem" mb="2rem">Register Student</Heading> 
			<Formik
			   initialValues={{fullname:'Bimal',faculty:''}}
			   validationSchema={studentRegisterValidation}
			   onSubmit={(values,{setSubmitting}) => {
			   	setTimeout(() => {
			   		alert(JSON.stringify(values,null,2));
			   		setSubmitting(false)
			   	},1000)
			   }}
			>
				{
					(props) => (
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
						    </SimpleGrid>
							<Button 
							    size="lg"
							    mt="2rem"
								type="submit"
								colorScheme="teal"
								isLoading={props.isSubmitting}
							>
								Submit
							</Button>
						</Form>
					) 
				}
			</Formik>
		</>
	);
}