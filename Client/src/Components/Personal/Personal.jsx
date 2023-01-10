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
import { useToast } from "@chakra-ui/react";
import { addPersonalExpense ,deletePrnlEx,patchPrnlEx, loginCheck} from "../Actions/AllActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
export default function Personal() {
  const dispatch = useDispatch();
  // loginCheck(dispatch)
  let [patchId,setPatchId]=useState("");
  let [deleteId,setdeleteId]=useState("");
  const months=["JAN","FEB","MAR","APR","MAY","JUN","JULY","AUG","SEP","OCT"]
  const toast=useToast()
  const { PEXPENCE } = useSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpen1, onOpen:onOpen1, onClose:onClose1 } = useDisclosure()
  const cancelRef = React.useRef()
  // let deleteId=-1;
  // let patchId=-1;
  function getInput() {
    ;
    let title = document.getElementById("title").value;
    let totalBill = document.getElementById("totalBill").value;
    let date = document.getElementById("inputcalendar").value;
    if(title=="" ||totalBill==""||date==""){
      toast({
        title: "Add Expense Fail",
        description: "Fill all the details",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }else{
       let obj = {
      title,
      totalBill,
      date,
    };
    addPersonalExpense(obj, dispatch);

    }
   
  }function setInput(el){
    // console.log( el.date.substring(0,16))
      document.getElementById('edittitle').value=el.title
      document.getElementById('editdate').value=el.date.substring(0,16)
      document.getElementById('editprice').value=el.totalBill;
      setPatchId(el._id)
      // patchId=;
   }
   function patchChange(){
   let userId=localStorage.getItem('userId');
   let title= document.getElementById('edittitle').value;
   let date= document.getElementById('editdate').value;
   let totalBill= document.getElementById('editprice').value;
   let obj={
    title,
    date,
    totalBill,
    itemId:patchId
   }
    // console.log(obj)
   patchPrnlEx(dispatch ,userId,obj)
   }
  //  console.log(patchId)
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
        {PEXPENCE && PEXPENCE.data && PEXPENCE.data.personalexpense.map((el,i) => {
          const str=el.date.split('-');
          return (
            <div className="divforp" key={i} onClick={async()=>{ patchId=el._id; await onOpen(); await setInput(el)}} >
              <div style={{display:"flex"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginRight:"10px",marginTop:"13px", color:"grey"}}> <div style={{fontSize:"17px"}}> {str[2][0]+""+str[2][1]}</div> <div>{ str[1]=="12"?"DEC": str[1]=="11" ? "NOV": months[Number(str[1][1])-1]}</div></div>
                <img
                  className="imgforpe"
                  src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                  alt=""
                />
              </div>
              <h3>{el.title}</h3> <div>₹ {el.totalBill}</div>{" "}
            
              <FiXCircle fontSize={"18px"} color={"brown"} onClick={async(event)=>{ event.stopPropagation();  setdeleteId(el._id);onOpen1()}} />
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
                      id="editprice"
                      placeholder="0.00"
                  
                      type="number"
                      background="white"
                    />
                  </InputGroup>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    id="editdate"
                    background="white"
                   
                    w={"93%"}
                    type="datetime-local"
                  />{" "}
                </div>
              </div>
              <Input placeholder="Description" id="edittitle" background="white" w={"103%"} />{" "}
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <Button colorScheme="pink" onClick={async()=>{await patchChange(); await onClose()}}>Edit Expence</Button>
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
          <AlertDialogHeader>Sure you want to delete an Expense?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>

          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose1}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={async()=>{ deletePrnlEx(dispatch,{itemId:deleteId})  ;  await onClose1()}} >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
}
