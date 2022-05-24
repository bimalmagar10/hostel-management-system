import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const bg = useColorModeValue('gray.200','gray.800');
  const signupBg = useColorModeValue('gray.300','gray.700');
  return (
    <Flex
      minH="calc(100vh - 6.35vh)"
      align={'center'}
      justify={'center'}
      bg={bg}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={signupBg}
          p={10}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel fontSize="1.4rem">First Name</FormLabel>
                  <Input p={3} fontSize="1.4rem" variant="filled" type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel fontSize="1.4rem">Last Name</FormLabel>
                  <Input p={3} fontSize="1.4rem" variant="filled" type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel fontSize="1.4rem">Email address</FormLabel>
              <Input p={3} fontSize="1.4rem" variant="filled" type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontSize="1.4rem">Password</FormLabel>
              <InputGroup>
                <Input p={3} fontSize="1.4rem" variant="filled" type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                size="lg"
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text fontSize="1.4rem" align={'center'}>
                Already an admin? <Link fontWeight="700" href="/admin/login" color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}