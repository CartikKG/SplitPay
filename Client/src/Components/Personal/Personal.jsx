import React from "react";
import { FiEdit, FiXCircle } from "react-icons/fi";

import "./Personal.css";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { addPersonalExpense } from "../Actions/AllActions";
import { useDispatch, useSelector } from "react-redux";
export default function Personal() {
  const months=["JAN","FEB","MAR","APR",]
  const { PEXPENCE } = useSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpen1, onOpen:onOpen1, onClose:onClose1 } = useDisclosure()
  const cancelRef = React.useRef()
  const dispatch = useDispatch();
  function getInput() {
    let title = document.getElementById("title").value;
    let totalBill = document.getElementById("totalBill").value;
    let date = document.getElementById("inputcalendar").value;
    let obj = {
      title,
      totalBill,
      date,
    };
    addPersonalExpense(obj, dispatch);
    console.log(process.env);
    console.log(typeof date);
  }
  return (
    <div>
      <div id="inputBox">
        <Input
          placeholder="Description"
          id="title"
          background="white"
          w={"50%"}
        />
        <InputGroup w={"35%"}>
          <InputLeftElement
            pointerEvents="none"
            color="gray.500"
            fontSize="1.1em"
            p={"0%"}
            m="0%"
            children="₹"
          />
          <Input
            placeholder="0.00"
            id="totalBill"
            type="number"
            background="white"
          />
        </InputGroup>
        <Input
          id="inputcalendar"
          placeholder="Select Date and Time"
          size="md"
          background="white"
          w={"20%"}
          type="datetime-local"
        />
        <Button colorScheme="pink" onClick={getInput}>
          Add Expence
        </Button>
      </div>
      <div>
        {PEXPENCE.data.personalexpense.map((el) => {
          const str=el.date.split('-');
          console.log(str);
          return (
            <div className="divforp">
              <div style={{display:"flex"}}>
                {/* <div>{ str[1]=="12"?"DEC" ? str[1]=="11"? "NOV"? "el.date":}</div> */}
                <img
                  className="imgforpe"
                  src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                  alt=""
                />
              </div>
              <h3>{el.title}</h3> <div>₹{el.totalBill}</div>{" "}
              <FiEdit onClick={onOpen} />
              <FiXCircle onClick={onOpen1} />
            </div>
          );
        })}
        <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bg="pink.500" h={"30px"} color="white">
              Edit Expense
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
               <img
                  className="imgforpe"
                  src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                  alt=""
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <InputGroup w={"93%"}>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.500"
                      fontSize="1.1em"
                      p={"0%"}
                      m="0%"
                      children="₹"
                    />

                    <Input
                      placeholder="0.00"
                      id="totalBill"
                      type="number"
                      background="white"
                    />
                  </InputGroup>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    background="white"
                    w={"93%"}
                    type="datetime-local"
                  />{" "}
                </div>
              </div>
              <Input placeholder="Description" background="white" w={"103%"} />{" "}
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <Button colorScheme="pink">Edit Expence</Button>
              </div>
            </ModalBody>
            <ModalFooter>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose1}
        isOpen={isOpen1}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard all of your notes? 44 words will be
            deleted.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose1}>
              No
            </Button>
            <Button colorScheme='red' ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
}
