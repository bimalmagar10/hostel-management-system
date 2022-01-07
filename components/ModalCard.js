import {
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalCloseButton,
	Button,
	useDisclosure
} from "@chakra-ui/react";
import NoticeCard from "../components/NoticeCard";
import {useRef} from "react";
export default function ModalCard({key,item}){
	const {isOpen,onOpen,onClose} = useDisclosure();
	const btnRef = useRef();
	return (
		<>
		    <NoticeCard refs ={btnRef} item={item} onOpen={onOpen}/>
			<Modal size="full" isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader fontSize="2.5rem" fontWeight="700">{item.title}</ModalHeader>
					<ModalCloseButton/>
					<ModalBody>
						{item.description}
					</ModalBody>
					<ModalFooter>
						<Button fontSize="1.6rem" p="2rem 2.5rem" colorScheme="red" mr={3} onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}