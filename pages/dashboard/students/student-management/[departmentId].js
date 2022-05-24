import {useEffect,useState} from "react";
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
	Box,
	HStack,
	Center,
	Spinner
} from "@chakra-ui/react";
import {EditIcon,SearchIcon,AddIcon,DeleteIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
import services from "./../../../../utils/services";
import {STUDENTS_URL} from "./../../../../utils/helpers";
import {paginate} from "./../../../../utils/utils";
import Pagination from "./../../../../components/Pagination";
import Layout from "../../../../components/Layout";
import axios from "axios";
import Head from "next/head";

export default function ManageStudent({data}) {
	const {query:{departmentId:deptName},push,reload} = useRouter();
	const [page,setPage] = useState(0);
	const [students,setStudents] = useState(null);
	useEffect(() => {
		setStudents(null);
		setTimeout(() => {
			const paginatedData = data ? paginate(data,5):[];
			const finalData = paginatedData[page] ?? [];
			setStudents(finalData);
		},1000)
	},[deptName,page]);

	function handlePrev(){
		setPage(oldPage => {
			const prevPage = oldPage - 1;
			if(prevPage < 0) {
				prevPage = paginate(data,5).length - 1;
			}
			return prevPage;
		});
	}

	function handleNext() {
		setPage(oldPage => {
			const nextPage = oldPage + 1;
			if(nextPage > paginate(data,5).length - 1){
				nextPage = 0;
			}
			return nextPage;
		});
	}

	function handleCurrent(index){
		setPage(index);
	}

	async function deleteStudent(id,fingerprintId) {
		setStudents(students => {
			return students.map(std => {
				if(std._id.toString() === id.toString()){
					std.isDeleting = true;
				}
				return std;
			})
		});
		const postdata = {"id":`${fingerprintId}`};
		// console.log(postdata);
		// return;
		try{
			const res = await axios.post("/api/nodemcu/deletefingerprint",postdata);
			toast({
	    		title:res.data,
	    		status:'success',
	    		variant:'top-accent',
	    		isClosable:true,
	    		duration:2000
			});
	   }catch(err){
	   	    console.log(err);
	   }
		services.delete(STUDENTS_URL,id).then(() => {
			setStudents(students =>  students.filter(std => std._id.toString() !== id.toString()));
		});
		//if(!(students.length-1)) {reload()};
	}
	return (
		<Layout>
		    <Head><title>Students - {deptName}</title></Head>
		    <Flex direction="row" justify="flex-start" align="center">
				<Heading mb="4rem" mr="20%">Students List</Heading>
				{/*<Stack direction="row" justify="center" spacing={0} align="stretch" mb="5rem">
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
	        	</Stack>*/}
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
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody className="block-data">
				    {
				    	students && students.map(student => (
				    		<Tr key={student.id}>
								<Td textAlign="left !important">{student.fullname}</Td>
								<Td>{student.rollno}</Td>
								<Td>{student.phone}1</Td>
								<Td>{student.faculty}</Td>
								<Td>{student.email}</Td>
								<Td>{student.address}</Td>
								<Td textAlign="center">
								<HStack spacing="1rem">
									<IconButton 
									colorScheme="blue" 
									size="lg"  
									fontSize="1.5rem" 
									aria-label="Edit Student" 
									icon={<EditIcon/>}
									onClick={() => push(`/dashboard/students/edit/${student._id}`)}
									/>
									<IconButton 
									colorScheme="red" 
									size="lg" 
									fontSize="1.5rem" 
									aria-label="Delete Student" 
									icon={<DeleteIcon/>}
									isLoading={student.isDeleting}
									onClick={() => deleteStudent(student._id,student.fingerprint)}
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
				!students && (<Center mt="2rem">
					<Spinner 
					thickness="4px"
					speed="0.5s"
					color="blue.500"
					size="xl"
					/>
					</Center>)
			}
			{
				students && !students.length && (
					<Center mt="2rem">No students to display</Center>
				)
			}
			<Box mt="3rem" mb="2rem" bg="gray.300" h="1.5px" w="100%"/>
			{
				data && !!data.length && (
					<Pagination
					   page={page}
					   data={paginate(data,5)}
					   handleNext={handleNext}
					   handlePrev={handlePrev}
					   handlePage={handleCurrent}
					/>
				)
			}

		</Layout>
	);
}

export async function getStaticPaths(){
	const {data:students} = await services.getAll(STUDENTS_URL); 
	const paths =  students.map(student => {
		return {
			params:{departmentId:student.faculty}
		}
	});
	return {
		paths,
		fallback:true
	};
}

export async function getStaticProps({params}){
	const {data:res} = await services.getAll(STUDENTS_URL);
	const data = res.filter(student => params.departmentId === student.faculty);
	return {
		props:{
			data
		}
	};
}


