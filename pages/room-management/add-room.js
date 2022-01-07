import {Heading} from "@chakra-ui/react";
import AddRoomForm from "../../components/AddRoomForm";
function AddRoom() {
	return (
		<>
			<Heading fontSize="3rem" mb="2rem">Add Room</Heading>
			<AddRoomForm/>
		</>
	);
}

export default AddRoom;