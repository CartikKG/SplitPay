import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import { ChakraProvider } from '@chakra-ui/react'
import Login from '../Login/Login'
export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
       
         <Route path="/signup" element={  <ChakraProvider>  <Signup/> </ChakraProvider>}/>
         <Route path="/login" element={  <ChakraProvider>  <Login/> </ChakraProvider>}/>
       
      </Routes> 
    </div>
  )
}
