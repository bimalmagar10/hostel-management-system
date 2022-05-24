import {
	Box,
	Avatar,
	Heading,
	Text,
	Stack,
	Badge, 
	Button,
	Center,
	useColorModeValue
} from "@chakra-ui/react";
import {elongateFaculty} from "../utils/utils";

export default function UserProfileCard({details:{student}}){
	return (
		
 		<Box
 		   p="2.5rem 2rem"
 		   maxW="32rem"
 		   w="full"
 		   textAlign="center"
 		   border="1px solid"
 		   borderColor={useColorModeValue('gray.300','gray.600')}
 		   rounded="xl"
 		   bg={useColorModeValue("white","gray.700")}
 		>
 			<Avatar 
 			size="2xl"
 			src="https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=852&q=80"
 			alt="Bimal's profile"
 			mb="2rem"
 			/>
 			<Heading fontFamily="inherit">{student.fullname}</Heading>
 			<Text fontSize="1.6rem" mb="1rem">
 				{elongateFaculty(student.faculty)} <Badge variant="outline" colorScheme="gray" fontSize="1.2rem" p="0 .5rem">Hosteler</Badge>
 			</Text>
 			<Text fontSize="1.6rem" mb="2rem">{student.rollno}</Text>
            <Stack align="center" justify="center" direction="row">
            	<Button fontSize="1.6rem" colorScheme="twitter" p="1.5rem">Batch (2{student.rollno.slice(3,6)})</Button>
            	<Button fontSize="1.6rem" variant="outline" colorScheme="twitter" p="1.5rem">Message</Button>
            </Stack>
 		</Box>
 		
	);
}