import AddRoomForm from "./../../../../components/AddRoomForm";
import services from "./../../../../utils/services";
import {ROOM_URL} from "./../../../../utils/helpers";
import Layout from "../../../../components/Layout";
import Head from "next/head";
export default function layout(props){
	return (
		<Layout>
			<Head><title>Room - Edit</title></Head>
			<AddRoomForm props={props}/>
		</Layout>
	);

}
export async function getServerSideProps({params}) {
    const {data:room} = await services.getById(ROOM_URL,params.id);
	return {
		props:{room}
	}
}
