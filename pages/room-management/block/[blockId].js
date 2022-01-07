import {
	Heading,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	Divider,
	IconButton,
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
function BlockDetails() {
	const router = useRouter();
	
	return (
		<>
			<Heading fontSize="3rem" mb="4rem">Block {router.query.blockId}</Heading>
			<Table variant="striped" size="lg" className="block-table">
				<Thead className="block-head">
					<Tr>
						<Th className="h">Room Name</Th>
						<Th>Block</Th>
						<Th>Students</Th>
						<Th>Tables</Th>
						<Th>Chairs</Th>
						<Th>Wardobe</Th>
						<Th>Beds</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody className="block-data">
					<Tr>
						<Td>R305</Td>
						<Td>A</Td>
						<Td>Bimal Thapa Magar</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td textAlign="center"><IconButton colorScheme="blue" size="lg"  fontSize="1.5rem" aria-label="Edit room" icon={<EditIcon/>}/></Td>
					</Tr>
					<Tr>
						<Td>R305</Td>
						<Td>A</Td>
						<Td>Bimal Thapa Magar</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td textAlign="center"><IconButton colorScheme="blue" size="lg"  fontSize="1.5rem" aria-label="Edit room" icon={<EditIcon/>}/></Td>
					</Tr>
					<Tr>
						<Td>R305</Td>
						<Td>A</Td>
						<Td>Bimal Thapa Magar</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td>2</Td>
						<Td textAlign="center"><IconButton colorScheme="blue" size="lg"  fontSize="1.5rem" aria-label="Edit room" icon={<EditIcon/>}/></Td>
					</Tr>
				</Tbody>
				<Tfoot>
					<Tr>
						<Divider/>
					</Tr>
				</Tfoot>
			</Table>
		</>
	);
}

export default BlockDetails;