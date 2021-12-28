import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
	Box,
	useColorModeValue
}from "@chakra-ui/react";
export default function Layout({children}) {
	const bgColor= useColorModeValue('gray.50','gray.800');
	return (
		<>
		        <Navbar/>
		        <Sidebar/>
	            <Box 
	            position="fixed" 
	            left="25rem" 
	            p="5rem" 
	            w="calc(100% - 25rem)"
	            bg={bgColor}
	            h="full"
	            >
		        	{children}
		        </Box>
        </>
	);
}