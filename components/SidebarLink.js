import {
	AccordionPanel,
	Link
} from "@chakra-ui/react";
export default function SidebarLink({links}){
    return (
    	<AccordionPanel>
    	    {
    	    	links.map((link,index) => (
    	    		<Link key={index} href="#" style={{
		    			textDecoration:"none",
		    			fontSize:"1.4rem",
		    			padding:"1rem",
		    			borderRadius:".5rem",
		    			fontWeight:"bold"
		    		}} display="block" _hover={{bg:"teal",color:"white"}}>
    		         {link}
    				</Link>
    	    	))
    	    }
    		
    	</AccordionPanel>
    );
}