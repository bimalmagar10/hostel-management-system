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
	useColorMode,
	Link,
	useToast,
	Image
} from "@chakra-ui/react";
import {
	MoonIcon,
	SunIcon
} from "@chakra-ui/icons";
import {useRouter} from "next/router";
import services from "../utils/services";
import  {AUTH_URL_LOGOUT} from "../utils/helpers";
function MenuBar(){
	const router = useRouter();
	const toast = useToast();
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			const res = await services.getAll(AUTH_URL_LOGOUT);
			if(res.status === 'success'){
				toast({
	    			title:'Logged out successfully',
	    			status:'success',
	    			variant:'top-accent',
	    			isClosable:true,
	    			duration:1000
    			});
				router.push('/auth/login');
			}
		}catch(err){
			toast({
    			title:`Error logging out!!`,
    			status:'error',
    			variant:'top-accent',
    			isClosable:true,
    			duration:2000
    		});
		}
		
	};
	const handleSettings = (e) => {
		e.preventDefault();
		router.push("/dashboard/settings");
	}
	return (
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
				<p>Admin</p>
			</Center>
			<br/>
			  <MenuDivider />
              <MenuItem>
              	 <Link onClick={handleSettings}>Settings</Link>
              </MenuItem>
              <MenuItem>
              	<Link onClick={handleLogout}>Logout</Link>
              </MenuItem>
			</MenuList>
	</Menu>
	);
}
export default function Navbar(){
	const {colorMode,toggleColorMode} = useColorMode();
	const navbarBg = useColorModeValue('gray.100','gray.900');
	const {route} = useRouter();
    return (
      	<>
	        <Box p="1rem 2rem" bg={navbarBg}>
	        	<Flex justify="space-between">
	        		<Box>
	        			<Image src="/tu-logo.png"  boxSize='40px'/>
	        		</Box>
	        		<Flex>
	        			<Stack direction="row" alignItems="center" spacing={7}>
	        				<Button 
	        					size="lg"
	        					onClick={toggleColorMode}
	        				>
	        					{colorMode === 'light' ?<MoonIcon/>:<SunIcon/>}
	        				</Button>
	        					  <MenuBar/>
	        			</Stack>
	        		</Flex>
	        	</Flex>
	        </Box>
      	</>
     );
}