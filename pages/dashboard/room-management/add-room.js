import {Heading} from "@chakra-ui/react";
import AddRoomForm from "./../../../components/AddRoomForm";
import Layout from "../../../components/Layout";
import Head from "next/head";
function AddRoom() {
	return (
		<Layout>
			<Head><title>Room - Add</title></Head>
			<Heading fontSize="3rem" mb="2rem">Add Room</Heading>
			<AddRoomForm/>
		</Layout>
	);
}

export default AddRoom;