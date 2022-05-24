import {useState,useEffect} from "react";
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
	Box,
	HStack,
	Spinner,
	Center
} from "@chakra-ui/react";
import {EditIcon,DeleteIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
import services from "./../../../../utils/services";
import {filterAccordingToBlock,paginate} from "./../../../../utils/utils";
import {ROOM_URL} from "./../../../../utils/helpers";
import Pagination from "./../../../../components/Pagination";
import Layout from "../../../../components/Layout";
import Head from "next/head";
export default function BlockDetails({data}) {
	const router = useRouter();
	const blockId = router.query.blockId;
	const [page,setPage] = useState(0);
   const [rooms,setRooms] = useState(null);
	useEffect(()=>{
		const paginatedData = (data && data.length) ? paginate(data,5):[];
		const finalData = paginatedData[page] ?? [];
		setRooms(finalData);
	},[blockId,page]);

   function handlePrev(){
   	setPage(oldPage => {
   		let prevPage = oldPage - 1;
   		if(prevPage < 0){
   			prevPage = paginate(data,5).length - 1;
   		}
   		console.log(prevPage);
   		return prevPage;
   	})
   }

   function handleNext() {
   	setPage(oldPage => {
   		let nextPage = oldPage + 1;
   		if(nextPage > paginate(data,5).length - 1){
   			nextPage = 0;
   		}
   		return nextPage;
   	})
   }
   function handleCurrent(index){
   	setPage(index);
   }

	function deleteRoom(id){
		 setRooms(rooms => rooms.map(room =>{
		 	if(room._id === id){
		 		room.isDeleting = true;
		 	}
		 	return room;
		 }))
		 services.delete(ROOM_URL,id).then(() => {
    			setRooms(rooms => rooms.filter(x => id !==x._id));
		 })
		 // if(!(rooms.length-1))
		 // 	router.reload();
		 //  console.log("rooms",rooms,rooms.length);
	}
	return (
		<Layout>
		   <Head><title>Block - {blockId}</title></Head>
			<Heading fontSize="3rem" mb="4rem">Block {router.query.blockId}</Heading>
			<Table variant="striped" size="lg" className="block-table" mb="2rem">
				<Thead className="block-head">
					<Tr>
						<Th className="h">Room Name</Th>
						<Th>Block</Th>
						<Th>Students</Th>
						<Th>Tables</Th>
						<Th>Chairs</Th>
						<Th>Wardrobe</Th>
						<Th>Beds</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody className="block-data">
					{
							!rooms && (
									<Spinner 
									thickness="4px"
									speed="0.5s"
									color="blue.500"
									size="xl"
									/>
							)
					}
					
					{
						rooms && rooms.map((room,i) => (
							<Tr key={i}>
								<Td>{room.roomName}</Td>
								<Td>{room.blockName}</Td>
								<Td lineHeight="3rem">{room.students[0]}<br/>{room.students[1]}</Td>
								<Td>{room.tables}</Td>
								<Td>{room.chairs}</Td>
								<Td>{room.wardrobe}</Td>
								<Td>{room.beds}</Td>
								<Td textAlign="center">
								    <HStack spacing="1rem">
									<IconButton 
										colorScheme="blue" 
										size="lg"  
										fontSize="1.5rem" 
										aria-label="Edit room" 
										icon={<EditIcon/>}
										onClick={() => router.push(`/dashboard/room-management/edit/${room._id}`)}
									/>
									<IconButton 
										colorScheme="red" 
										size="lg" 
										fontSize="1.5rem" 
										aria-label="Delete Room" 
										icon={<DeleteIcon/>}
										onClick={() => deleteRoom(room._id)}
										isLoading={room.isDeleting}
									/>
									</HStack>
								</Td>
							</Tr>
						))
					}
				</Tbody>
				<Tfoot>
					<Tr/>
				</Tfoot>
			</Table>
			{
				    	rooms && !rooms.length && (
			    		   <Box>
			    				<Center>No rooms to display</Center>
			    		   </Box>
				    	)
		   }
			<Box mt="3rem" mb="2rem" bg="gray.300" h="1px" w="100%"/>
			{
				data && !!data.length && (
					<Pagination
					   page={page}
					   data={paginate(data,5)}
					   handlePage={handleCurrent}
					   handleNext={handleNext}
					   handlePrev={handlePrev}
			 		/>
				)
			}
		</Layout>
	);
}
export async function getStaticPaths(){
	const {data} = await services.getAll(ROOM_URL);
	const paths =data.map(room => {
		return {
			params:{blockId:room.blockName}
		}
	});
	return {
		paths,
		fallback:true
	};
}

export async function getStaticProps({params}){
   const {data:res} = await services.getAll(ROOM_URL);
   const data = res.filter(x => x.blockName === params.blockId);
   return {
   	props:{
   		data
   	}
   };
}