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
import { FiXCircle } from "react-icons/fi";
// import {   Flex, Icon, Text } from "@chakra-ui/react";
// import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletegroup } from '../Actions/Allgroupexpense';


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
  const navigate=useNavigate();
  const dispatch=useDispatch();
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
      <Button colorScheme='green' onClick={()=>{navigate('/yourdetails')}}>Add a Personal Expence</Button>
      <Button colorScheme='messenger' onClick={()=>{navigate('/friends')}}>Add Friend</Button>
      <Button colorScheme='pink' onClick={()=>{navigate('/group')} }>Add a Group Expence</Button>
      </div>
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard borderColor="red" title={'Total Expense'} stat={ store.PEXPENCE && store.PEXPENCE.data &&  `₹ ${store.PEXPENCE.data.bill+groupt}`} />
        <StatsCard title={'Group Expense'} stat={ `₹ ${groupt}`}  />
        <StatsCard title={'Personal Expense'} stat={ store.PEXPENCE && store.PEXPENCE.data &&   `₹ ${store.PEXPENCE.data.bill}`} />
      </SimpleGrid>
    </Box>
    <div id="allgroupps">
     <h1>  Your Group :-</h1>
       {
        store.allgroup && store.allgroup.data && store.allgroup.data.map((el)=>   {
          if(el.admin._id==userId){
            return <><div style={{border:"1px solid #c5c5c5", display:"flex",padding:"7px",borderRadius:"10px", alignItems:"center",gap:"3px"}}>  <Button colorScheme='green' onClick={()=>{navigate('/yourdetails')}}>{el.title}</Button> <FiXCircle color='#c66161' cursor="pointer"  fontSize={"22px"} onClick={()=>{deletegroup(el._id,userId,dispatch)}}/></div></>
          }
        
      })}
    </div>
    </>
  );
}