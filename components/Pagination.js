import {
	Stack,
	Button,
	useColorModeValue
} from "@chakra-ui/react";
export default function Pagination({page,data,handlePage,handleNext,handlePrev}){
	const active = useColorModeValue('teal.50','blue.600')
	return (
		<Stack spacing="1rem" direction="row" justify="center">
		    <Button 
			    variant="solid" 
			    colorScheme="blue" 
			    fontSize="1.5rem"
			    onClick={() => handlePrev()}
		    >
		     Prev
		    </Button>
		    {
		    	data && data.map((item,index) => {
		    		return (
		    			<Button 
		    			key={index}
		    			variant="outline" 
		    			colorScheme="teal" 
		    			fontSize="1.5rem"
		    			bg={index === page ? active:null}
		    			onClick={() => handlePage(index)}
		    			>
		    				{index + 1}
		    			</Button>
		    		)
		    	})
		    }
			<Button 
				variant="solid" 
				colorScheme="blue" 
				fontSize="1.5rem"
				onClick={() => handleNext()}
			>
			 Next
			</Button>
		</Stack>
	);
};