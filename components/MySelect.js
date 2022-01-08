import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Select,
} from "@chakra-ui/react";
import {useField} from "formik";

export default function MySelect({label,placeholder,...props}) {
	const [field,meta] = useField(props);
	return (
		<FormControl isInvalid={meta.error && meta.touched} isRequired>
			<FormLabel htmlFor ={props.name} fontSize="1.4rem">{label}</FormLabel>
			<Select {...field} {...props} size="lg" fontSize="1.4rem" placeholder={placeholder}/>
			<FormErrorMessage fontSize="1.4rem">{meta.error}</FormErrorMessage>
		</FormControl>
	);
}