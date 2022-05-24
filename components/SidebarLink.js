import {useRouter} from "next/router";
import {
	AccordionPanel,
	Link
} from "@chakra-ui/react";
export default function SidebarLink({links}){
	const router = useRouter();
	const handleClick = (event,slug) => {
        event.preventDefault();
        router.push(slug);
	};
    return (
    	<>
    	    {
    	    	links.map((link,index) => (
    	    		<Link key={index} href={link.slug} style={{
		    			textDecoration:"none",
		    			fontSize:"1.4rem",
		    			padding:"1rem",
		    			borderRadius:".5rem",
		    			fontWeight:"bold"
		    		}} display="block" _hover={{bg:"teal",color:"white"}}
		    		   onClick={(event) => handleClick(event,link.slug)}
		    		>
    		         {link.title}
    				</Link>
    	    	))
    	    }
    		
    	</>
    );
}