import React from 'react'
import { Button} from '@chakra-ui/react'
import "./HomeDashboard.css"
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  useStyleConfig 
} from '@chakra-ui/react';
import {   Flex, Icon, Text } from "@chakra-ui/react";
// import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';


function StatsCard(props) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function HomeDashboard(props) {
  let [groupt,setGroupt]=useState(0);
  const store=useSelector((state)=>state);
  let userId=localStorage.getItem('userId');
  useEffect(()=>{
    if(store.CurrentGroupData.data && store.CurrentGroupData.data.balanceofUsers ){
      store.CurrentGroupData.data.balanceofUsers.forEach(element => {
        if(element.user._id==userId){
          setGroupt(element.info.youPay);
          
        }
      });
    } 
  },[store.CurrentGroupData])
  return (
    <>
        <div id="tophomebutton"> 
      <Button colorScheme='green'>Add a Personal Expence</Button>
      <Button colorScheme='messenger'>Add Friend</Button>
      <Button colorScheme='pink'>Add a Group Expence</Button>
      </div>
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      {/* <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}>
        What is our company doing?
      </chakra.h1> */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard borderColor="red" title={'Total Expense'} stat={ store.PEXPENCE && store.PEXPENCE.data &&  `₹ ${store.PEXPENCE.data.bill+groupt}`} />
        <StatsCard title={'Group Expense'} stat={ `₹ ${groupt}`}  />
        <StatsCard title={'Personal Expense'} stat={ store.PEXPENCE && store.PEXPENCE.data &&   `₹ ${store.PEXPENCE.data.bill}`} />
      </SimpleGrid>

      {/* <Box
      p='24px'
      bg='linear-gradient(127.09deg, rgba(24, 29, 60, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)'
      my='22px'
      borderRadius='20px'>
      <Flex justify='space-between' w='100%' align='flex-start'>
        <Flex direction='column' maxW='70%'>
          <Text color='#fff' fontSize='sm' mb='10px'>
           cxbvcx
          </Text>
          <Text color='gray.400' fontSize='xs'>
            Company Name: {window.innerWidth < 768 ? <br /> : null}
            <Text as='span' color='gray.500'>
             cxb
            </Text>
          </Text>
          <Text color='gray.400' fontSize='xs'>
            Email Address:{" "}
            <Text as='span' color='gray.500'>
              cxb
            </Text>
          </Text>
          <Text color='gray.400' fontSize='xs'>
            VAT Number:{" "}
            <Text as='span' color='gray.500'>
             sdds
            </Text>
          </Text>
        </Flex>
        <Flex direction={{ sm: "column", md: "row" }} align='flex-start'>
          <Button
            p='0px'
            variant='no-hover'
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}>
            <Flex color='red.500' cursor='pointer' align='center' p='12px'>
              <Icon as={FaTrashAlt} me='4px' w='16px' h='16px' />
              <Text fontSize='xs'>DELETE</Text>
            </Flex>
          </Button>
          <Button p='0px' variant='no-hover'>
            <Flex color='#fff' cursor='pointer' align='center' p='12px'>
              <Icon as={FaPencilAlt} me='4px' w='14px' h='14px' />
              <Text fontSize='xs' color='gray.400'>
                EDIT
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Box> */}
    </Box>
    </>
  );
}