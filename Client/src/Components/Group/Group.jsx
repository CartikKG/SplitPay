import React from 'react'
import { Button} from '@chakra-ui/react'
import "./Group.css"
export default function Group() {
  return (
    <div>
      {/* <h1>Group</h1> */}
      <div id="topbuttons"> 
      <Button colorScheme='pink'>Add an Expence</Button>
      <Button colorScheme='blue'>Invite to Group</Button>
      </div>
    </div>
  )
}
