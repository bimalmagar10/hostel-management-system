import {useState} from "react";
import services from "../../utils/services";
import {AUTH_URL_LOGIN} from "../../utils/helpers";
import {useRouter} from "next/router";
import {
	Flex,
	Heading,
	Input,
	useColorModeValue,
	Button,
	Stack,
	Link,
	Text,
	InputGroup,
	InputLeftElement,
	useToast,
	useColorMode
} from "@chakra-ui/react";
import {
	MoonIcon,
	SunIcon,
} from "@chakra-ui/icons";
import { FaUserAlt } from 'react-icons/fa';
import {RiLockPasswordFill} from "react-icons/ri";
import Head from "next/head";
export default function Login() {
	const loginBg= useColorModeValue('gray.300','gray.700');
	const bg= useColorModeValue('gray.200','gray.800');
    const toast = useToast();
    const {colorMode,toggleColorMode} = useColorMode();

	const [username,setUsername] = useState("");
	const [password,setPassword] = useState("");
	const [isSubmitting,setSubmitting] = useState(false);
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		const credentials = {username,password};
		try{
			
			const user = await services.create(AUTH_URL_LOGIN,credentials);
			if(user.status = "success"){
				toast({
	    			title:'Log in successfull',
	    			status:'success',
	    			variant:'top-accent',
	    			isClosable:true,
	    			duration:5000
    			});
    			setSubmitting(false);
				router.push("/dashboard");
			}
		}catch (err){
			setSubmitting(false);
			toast({
    			title:`${err}`,
    			status:'error',
    			variant:'top-accent',
    			isClosable:true,
    			duration:3000
    		});
		}
		
	};
	return (
		<>
		  <Head><title>Login</title></Head>
		    <Flex width="100%" minHeight="100vh" background={bg} alignItems="center" justifyContent="center">
				<Flex  boxShadow='lg' width="25%" direction="column" justify="center" align="center !important" p={12} background={loginBg} rounded={5}>
					<Heading mb={12} align="center">Login</Heading>
					<form width="100%" style={{display:"flex",flexDirection:"column",alignItems:"center"}} onSubmit={handleSubmit}>
					    <InputGroup>
							<InputLeftElement
							pt={2}
							pointerEvents='none'
							fontSize="1.4rem"
							children={<FaUserAlt color='gray.300'/>}
							/>
							<Input 
								width="100%" 
								fontSize="1.4rem" 
								variant="filled" 
								placeholder="Enter username" 
								size="lg" 
								mb={11} 
								name="username"
								id="username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</InputGroup>
						<InputGroup>
							<InputLeftElement
							pt={2}
							pointerEvents='none'
							fontSize='1.4rem'
							children={<RiLockPasswordFill color='gray.300'/>}
							/>
							<Input 
								fontSize="1.4rem" 
								variant="filled" 
								placeholder="Enter password" 
								size="lg" 
								type="password"
								name="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</InputGroup>
						<Flex align="center">
							<Button 
							    textAlign="center"
								mt="1.5rem" 
								fontSize="1.4rem" 
								size="lg" 
								colorScheme="blue" 
								type="submit"
								isLoading={isSubmitting}
								_hover={{
									bg:'blue.400'
								}}
							>
								Log In
							</Button>
							<Button 
							    ml={5}
							    mt="1.5rem"
								size="lg"
								onClick={toggleColorMode}
							>
								{colorMode === 'light' ?<MoonIcon/>:<SunIcon/>}
							</Button>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</>
	);
}