import {
	Box,
	Flex,
	Stack,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
    Center,
	Avatar,
	useColorModeValue,
	useColorMode
} from "@chakra-ui/react";
import {
	MoonIcon,
	SunIcon
} from "@chakra-ui/icons";
export default function Navbar(){
	const {colorMode,toggleColorMode} = useColorMode();
	const navbarBg = useColorModeValue('gray.100','gray.900');
    return (
      	<>
	        <Box p="1rem 2rem" bg={navbarBg}>
	        	<Flex justify="space-between">
	        		<Box>Logo</Box>
	        		<Flex>
	        			<Stack direction="row" spacing={7}>
	        				<Button 
	        					size="lg"
	        					onClick={toggleColorMode}
	        				>
	        					{colorMode === 'light' ?<MoonIcon/>:<SunIcon/>}
	        				</Button>
	        				<Menu>
	        					<MenuButton
	        					   as={Button}
	        					   rounded={"full"}
	        					   variant={'link'}
	        					   cursor={"pointer"}
	        					>
	        					    <Avatar 
		        					    size="md" 
		        					    src={'https://avatars.dicebear.com/api/male/username.svg'}
	        					    />
	        					</MenuButton>
	        					<MenuList>
	        					<br/>
	        					<Center>
	        						<Avatar
	        						   size="2xl"
	        						   src="https://avatars.dicebear.com/api/male/username.svg"
	        						/>
	        					</Center>
	        					<br/>
	        					<Center>
	        						<p>Username</p>
	        					</Center>
	        					<br/>
	        					  <MenuDivider />
				                  <MenuItem>Account Settings</MenuItem>
				                  <MenuItem>Logout</MenuItem>
	        					</MenuList>
	        				</Menu>
	        			</Stack>
	        		</Flex>
	        	</Flex>
	        </Box>
      	</>
     );
}