import React from 'react'
import Logo from "../../assets/splitpay-logo.png"
import {Link} from "react-router-dom"
import { Button, ButtonGroup } from '@chakra-ui/react'
import "./navbar.css"

export default function Navbar() {
  return (
    <div id="navbar">
     <Link to='/'><img src={Logo} alt="logo-splitpay" /></Link>
     <div>
     <Link to="/login" ><Button colorScheme='black' variant='outline'>Login</Button></Link> 
     <Link to="/signup" > <Button colorScheme='pink'>SignUp</Button></Link> </div>
    </div>
  )
}
