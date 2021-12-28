import {
	Table,
	Tbody,
	Tr,
	Td,
	Tfoot,
	Th,
	useColorModeValue
} from "@chakra-ui/react";
export default function UserDetails(){
   return (
   	<Table
   	border="1px solid" 
   	borderColor={useColorModeValue("gray.300","gray.600")}
   	bg={useColorModeValue("white",'gray.800')}
   	fontSize="1.6rem"
   	>
   		<Tbody>
   			<Tr>
   				<Td>Full Name</Td>
   				<Td>Bimal Thapa Magar</Td>
   			</Tr>
   			<Tr>
   				<Td>Gender</Td>
   				<Td>Male</Td>
   			</Tr>
   			<Tr>
   				<Td>Email</Td>
   				<Td>inheritedbimal@gmail.com</Td>
   			</Tr>
   			<Tr>
   				<Td>Date of birth</Td>
   				<Td>2057-03-26(BS)&nbsp;&nbsp;2000-07-10(AD)</Td>
   			</Tr>
   			<Tr>
   				<Td>Father's Name</Td>
   				<Td>Champa Sing Thapa Magar</Td>
   			</Tr>
   			<Tr>
   				<Td>Mother's Name</Td>
   				<Td>Danu Maya Thapa</Td>
   			</Tr>
   			<Tr>
   				<Td>Address</Td>
   				<Td>Bagar,Pokhara</Td>
   			</Tr>
   			<Tr>
   				<Td>Block</Td>
   				<Td>A</Td>
   			</Tr>
   			<Tr>
   				<Td>Room No</Td>
   				<Td>205</Td>
   			</Tr>
   			<Tr>
   				<Td>Phone No</Td>
   				<Td>9805807816</Td>
   			</Tr>
   			<Tr>
   				<Td>Is in Hostel</Td>
   				<Td>Yes</Td>
   			</Tr>
   		</Tbody>
   		 <Tfoot>
		    &nbsp;
  		</Tfoot>
   	</Table>
   	);
}