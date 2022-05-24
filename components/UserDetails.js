import {
	Table,
	Tbody,
	Tr,
	Td,
	Tfoot,
	Th,
	useColorModeValue
} from "@chakra-ui/react";
export default function UserDetails({details:{student,room}}){
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
   				<Td>{student.fullname}</Td>
   			</Tr>
   			<Tr>
   				<Td>Gender</Td>
   				<Td>Male</Td>
   			</Tr>
   			<Tr>
   				<Td>Email</Td>
   				<Td>{student.email}</Td>
   			</Tr>
   			<Tr>
   				<Td>Date of birth</Td>
   				<Td>{student.dob}(AD)</Td>
   			</Tr>
   			<Tr>
   				<Td>Father's Name</Td>
   				<Td>{student.fathersName}</Td>
   			</Tr>
   			<Tr>
   				<Td>Mother's Name</Td>
   				<Td>{student.mothersName}</Td>
   			</Tr>
   			<Tr>
   				<Td>Address</Td>
   				<Td>{student.address}</Td>
   			</Tr>
   			<Tr>
   				<Td>Block</Td>
   				<Td>{room.blockName}</Td>
   			</Tr>
   			<Tr>
   				<Td>Room No</Td>
   				<Td>{room.roomName}</Td>
   			</Tr>
   			<Tr>
   				<Td>Phone No</Td>
   				<Td>{student.phone}</Td>
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