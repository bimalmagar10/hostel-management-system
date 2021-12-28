import UserProfileCard from "../components/UserProfileCard";
import UserDetails from "../components/UserDetails";
import {
	Stack,
	Input,
	IconButton,
	useColorModeValue,
	Heading
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import Head from "next/head";
export default function StudentDetails(){
	return (
		<>
		<Head>
		  <title>Student Details</title>
		</Head>
		<Heading mb="5rem" textTransform="uppercase" fontSize="3rem" fontFamily="inherit">Student Details</Heading>
        <Stack direction="row" justify="center" spacing={0} align="stretch" mb="5rem">
        	<Input
        	size="lg"
        	p="2rem 1.5rem"
        	fontSize="1.6rem"
        	maxW="50rem" 
        	placeholder="Search students by name or roll number"
        	rounded={false} bg={useColorModeValue('white','gray.700')}/>
        	<IconButton 
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
		<Stack justify="space-between" align="flex-start" direction="row" spacing="2rem">
			<UserProfileCard/>
			<UserDetails/>
		</Stack>
		</>
	);
}