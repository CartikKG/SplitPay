import React from 'react';
import "./dashboard.css"
import Logo from "../../assets/splitpay-logo.png"
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from '../Actions/AllActions'
import { ChakraProvider } from '@chakra-ui/react'
import {
  FiHome,
  FiUsers,
  FiClipboard,
  FiMousePointer,
  FiSettings,
  FiMenu,
  FiBook,
  FiUser,
  FiChevronDown,
} from 'react-icons/fi';
import {Link, Outlet} from 'react-router-dom'
const LinkItems = [
  { name: 'Home', icon: FiHome,path:'/' }, 
  { name: 'Personal', icon: FiBook ,path:'/yourdetails'},
  { name: 'Groups', icon: FiUsers ,path:'/group'},  
  { name: 'Friends', icon: FiUser ,path:'/friends'},
  { name: 'All Expense', icon: FiClipboard ,path:'/allexpence' },
  { name: 'Recent Activity', icon: FiMousePointer ,path:'/recentactivity'},
 
 
  { name: 'Settings', icon: FiSettings ,path:'/setting'},
];

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider>
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
     
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
       
        <Outlet/>
      </Box>
    </Box>
    </ChakraProvider>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
         <img  id="logofromdashboard"  src={Logo}alt="" />
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (

       <Link  key={link.name} style={{textDecoration:"none"}} to={link.path}  onClick={onClose}>
       <NavItem  icon={link.icon}  >
          {link.name}
        </NavItem>
     </Link>
        
      ))}
    </Box>
  );
};


const NavItem = ({ icon, children, ...rest }) => {
  return (
    // <Link href="/setting" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    // </Link>

  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const {isLogin, userData}=useSelector((state)=>state);
  // console.log(store);
  const dispatch=useDispatch();
  function logoutFunction(){
    localStorage.clear();
    logoutUser(dispatch);
    window.open(`${process.env.REACT_APP_CLIENT}`, "_self");
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        <img style={{width:"55%", margin:"auto"}} src={Logo}alt="" />
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
       
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    // 'https://lh3.googleusercontent.com/a/AEdFTp7e87CBV0bKmpuqhX5MHU4YAJ-3Z40OnSFBgL7KdQ=s96-c'
                  userData.avatar
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{userData.name}</Text>
                  {/* <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text> */}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem >Profile</MenuItem>
              <MenuItem >Settings</MenuItem>
              <MenuItem >Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutFunction}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};