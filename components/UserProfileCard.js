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

export default function UserProfileCard(){
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
 			<Heading fontFamily="inherit">Bimal Thapa Magar</Heading>
 			<Text fontSize="1.6rem" mb="1rem">
 				Electronics and Communication Engineering <Badge variant="outline" colorScheme="gray" fontSize="1.2rem" p="0 .5rem">Full Fee</Badge>
 			</Text>
 			<Text fontSize="1.6rem" mb="2rem">PAS074BEX013</Text>
            <Stack align="center" justify="center" direction="row">
            	<Button fontSize="1.6rem" colorScheme="twitter" p="1.5rem">Batch(2074)</Button>
            	<Button fontSize="1.6rem" variant="outline" colorScheme="twitter" p="1.5rem">Message</Button>
            </Stack>
 		</Box>
 		
	);
}