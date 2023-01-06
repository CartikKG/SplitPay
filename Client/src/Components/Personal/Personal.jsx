import React from 'react'
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
export default function Personal() {
  return (
    <div>
       <div id="inputBox">
        <Input placeholder="Description" background="white" w={"50%"} />
        <InputGroup w={"35%"}>
          <InputLeftElement
            pointerEvents="none"
            color="gray.500"
            fontSize="1.1em"
            p={"0%"}
            m="0%"
            children="₹"
          />
          <Input placeholder="0.00" type="number" background="white" />
        </InputGroup>
        <Button colorScheme="pink">Add Expence</Button>
      </div>
    </div>
  )
}
