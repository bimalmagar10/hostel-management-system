import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Link,
} from "@chakra-ui/react";
import SidebarLink from "./SidebarLink";
export default function SidebarItem({contents}) {
	const {title,items,hasToggle,slug} = contents;
	
	return (
        <Accordion allowToggle={hasToggle}>
        	<AccordionItem>
        	 <Link href={hasToggle ? undefined :`/${slug}`} style={{textDecoration:'none'}}>
        		<h2>
        			<AccordionButton p="1.5rem">
        				<Box flex='1' textAlign='left' fontSize="1.6rem" fontWeight="bold">
        					{title}
        				</Box>
        				{hasToggle ? <AccordionIcon/> : null}
        			</AccordionButton>
        		</h2>
        		<AccordionPanel>
        		{
        			items ?<SidebarLink links={items}/>: null
        		}
        		</AccordionPanel>
        	</Link>
        	</AccordionItem>
        </Accordion>
	);
}
