import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import { ChakraProvider } from '@chakra-ui/react'
import Login from '../Login/Login'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import PageNotFound from '../PageNotFound/PageNotFound'
export default function AllRoutes() {
  return (
    <div>
          <ChakraProvider>
          <Navbar/>
          </ChakraProvider>
        <Routes>
        <Route path="/" element={<Home/>}/>
         
         <Route path="/signup" element={    <ChakraProvider>  <Signup/> </ChakraProvider>}/>
         <Route path="/login" element={  <ChakraProvider>  <Login/> </ChakraProvider>}/>
         <Route path="*" element={  <ChakraProvider> <PageNotFound/> </ChakraProvider>}/>
       
         </Routes> 
         <ChakraProvider>
         <Footer/>
         </ChakraProvider>
    </div>
  )
}
