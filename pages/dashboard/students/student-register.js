import {Heading} from "@chakra-ui/react";
import AddEditStudentForm from "./../../../components/AddEditStudentForm";
import Layout from "../../../components/Layout";
import Head from "next/head";
export default function StudentRegister(props) {
	return (
		<Layout>
		    <Head><title>Student - Register</title></Head>
			<Heading fontSize="3rem" mb="2rem">Register Student</Heading> 
			<AddEditStudentForm/>
		</Layout>
	);
}