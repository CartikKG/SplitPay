import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Divider,
} from "@chakra-ui/react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useToast
} from "@chakra-ui/react";
import "./Group.css";
import { createNewgroup } from "../Actions/Allgroupexpense";
import { useDispatch } from "react-redux";

export default function Group() {
  const dispatch=useDispatch();
  const toast=useToast()
  function fetchedData() {
    let title = document.getElementById("groupName").value;
    let type = document.getElementById("groupType").value;

    
    if(title=="" ||type==""){
      toast({
        title: "Create Group Fail",
        description: "Fill all the details",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }else{
     let obj={
      title,
      type
     }   
      createNewgroup(dispatch,obj);
    };

  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {/* <h1>Group</h1> */}
      <div id="topGroup">
        <Button colorScheme="red">Change Group</Button>
        <h1>Group Name</h1>
        <Button colorScheme="blue">Invite to group</Button>
        <Button colorScheme="teal" onClick={onOpen}>
          Create new group
        </Button>
      </div>
      <Divider borderColor="pink.800" mb={"10px"} />

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
        <Input
          id="inputcalendar"
          placeholder="Select Date and Time"
          size="md"
          background="white"
          w={"20%"}
          type="datetime-local"
        />
        <Button colorScheme="pink">Add Expence</Button>
      </div>

      <div id="topbuttons"></div>
      <div id="createnewGroup">
        <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bg="teal" h={"30px"} color="white">
              Create new group
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <Input 
                placeholder="Enter group name"
                id="groupName"
                background="white"
                w={"100%"}
                mb={"8px"}
              />
              <Select placeholder="Select group type" id="groupType">
                <option value="Home">Home</option>
                <option value="Trip">Trip</option>
                <option value="Couple">Couple</option>
                <option value="Other">Other</option>
              </Select>
              <h2
                style={{
                  color: "grey",
                  fontSize: "14px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                You can invite people after creating a group
              </h2>
              {/* <br /> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "6px",
                }}
              >
                <Button colorScheme="teal" onClick={async () => {await fetchedData();  await onClose()}}>
                  Create
                </Button>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
