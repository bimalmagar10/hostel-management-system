import {
	LinkBox,
	LinkOverlay,
	Tag,
	Heading,
	Box,
	Flex,
	Icon,
	useColorModeValue,
	HStack,
	SimpleGrid,
} from "@chakra-ui/react";
import {ChevronRightIcon,TimeIcon} from "@chakra-ui/icons";

export default function NoticeCard({item,onOpen,ref}){
  	const hoverBgColor = useColorModeValue('pink.50','gray.900');
  	const boxColor = useColorModeValue('white','gray.700');
	return (
		<LinkBox 
                 borderRadius="5px" 
                 p="1.5rem"
                 bg={boxColor}
                 _hover={{
                   bg:`${hoverBgColor}`
                 }}
                 role="group"
                 transition="all .3s ease"
                border="1px solid"
                borderColor={useColorModeValue('gray.300','gray.600')}
                onClick={onOpen}
                ref={ref}
                cursor="pointer"
              >
                  <Tag fontSize="1.4rem" p=".5rem 1rem" mb="1.5rem" colorScheme="green">{item.label}</Tag>
                  <Heading fontSize="2.5rem" mb="1rem">
                    <Flex justify="space-between" align="center">
                      <LinkOverlay transition="all .3s ease" _groupHover={{color:'pink.400'}}>
                         {item.title}
                      </LinkOverlay>
                      <Icon 
                      as={ChevronRightIcon} 
                      transition="all .3s ease" 
                      w="2.5rem" h="2.5rem"
                      transform="translateX(-10px)" 
                      _groupHover={{color:'pink.400',transform:'translateX(0)'}}
                      />
                    </Flex>
                  </Heading>
                  <HStack alignItems="center" jusitfy="flex-start">
                    <Icon as={TimeIcon} w="1.4rem" h="1.4rem"/>
                    <Box as="time" fontSize="1.4rem">
                     {item.date}
                    </Box>
                  </HStack>
        </LinkBox>
	);
}