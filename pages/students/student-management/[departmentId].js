import {
	Heading,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	Divider,
	IconButton,
	Flex,
	Stack,
	Input,
	useColorModeValue,
	Box
} from "@chakra-ui/react";
import {EditIcon,SearchIcon,AddIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
export default function ManageStudent() {
	const {query} = useRouter();
	return (
		<>
		    <Flex direction="row" justify="flex-start" align="center">
				<Heading mb="4rem" mr="20%">Students List</Heading>
				<Stack direction="row" justify="center" spacing={0} align="stretch" mb="5rem">
		        	<Input
		        	size="lg"
		        	p="2rem 1.5rem"
		        	fontSize="1.6rem"
		        	width="35rem"
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
        	</Flex>
			<Table variant="striped" size="lg" className="block-table">
				<Thead className="block-head">
					<Tr>
						<Th>Full Name</Th>
						<Th>Roll Number</Th>
						<Th>Phone No.</Th>
						<Th>Faculty</Th>
						<Th>Email</Th>
						<Th>Address</Th>
						<Th>Fingerprint</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody className="block-data">
					<Tr>
						<Td textAlign="left !important">Bimal Thapa Magar</Td>
						<Td>PAS074BEX013</Td>
						<Td>9864430141</Td>
						<Td>{query.departmentId}</Td>
						<Td>bimalmagar873@gmail.com</Td>
						<Td>Pokhara</Td>
						<Td>hastagsthstsh</Td>
						<Td textAlign="center"><IconButton colorScheme="blue" size="lg"  fontSize="1.5rem" aria-label="Edit room" icon={<EditIcon/>}/></Td>
					</Tr>
					<Tr>
						<Td textAlign="left !important">Nirmal Adhikari</Td>
						<Td>PAS074BEX013</Td>
						<Td>9864430141</Td>
						<Td>{query.departmentId}</Td>
						<Td>bimalmagar873@gmail.com</Td>
						<Td>Pokhara</Td>
						<Td>hastagsthstsh</Td>
						<Td textAlign="center"><IconButton colorScheme="blue" size="lg"  fontSize="1.5rem" aria-label="Edit room" icon={<EditIcon/>}/></Td>
					</Tr>
					<Tr>
						<Td textAlign="left !important">Nirmal Adhikari</Td>
						<Td>PAS074BEX013</Td>
						<Td>9864430141</Td>
						<Td>{query.departmentId}</Td>
						<Td>bimalmagar873@gmail.com</Td>
						<Td>Pokhara</Td>
						<Td>hastagsthstsh</Td>
						<Td textAlign="center"><IconButton colorScheme="blue" size="lg"  fontSize="1.5rem" aria-label="Edit room" icon={<EditIcon/>}/></Td>
					</Tr>
				</Tbody>
				<Tfoot>
				  <Tr/>
				</Tfoot>
			</Table>
			<Box mt="3rem" bg="gray.300" h="1.5px" w="100%"/>
		</>
	);
}