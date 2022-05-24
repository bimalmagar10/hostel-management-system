import {
	Box,
	VStack,
	useColorModeValue
} from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import {sidebarContents} from '../utils/helpers';
export default function Sidebar() {
	return (
		<>
		   <Box
		      borderRight='1px'
		      borderRightColor={useColorModeValue('gray.200','gray.700')}
		      w={{base:'full',md:"25rem"}}
		      position="fixed"
  			  h='full'
		   >
             {
             	sidebarContents.map((item,index) =>(
             		<SidebarItem key={index} contents={item}/>
             	))
             }
		   </Box>
		</>
	);
};