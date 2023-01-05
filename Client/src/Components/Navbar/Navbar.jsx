import React from 'react'
import Logo from "../../assets/splitpay-logo.png"
import { Button, ButtonGroup } from '@chakra-ui/react'
import "./navbar.css"

export default function Navbar() {
  return (
    <div id="navbar">
     <img src={Logo} alt="logo-splitpay" />
     <div>
     <Button colorScheme='black' variant='outline'>Login</Button>
     <Button colorScheme='pink'>SignUp</Button></div>
    </div>
  )
}
