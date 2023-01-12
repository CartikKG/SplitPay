import React, { useEffect, useState } from "react";
import { FiXCircle } from "react-icons/fi";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Divider,
  Avatar,
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
  useToast,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Badge,
  useClipboard,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/react";
// import { addPersonalExpense ,patchPrnlEx, loginCheck} from "../Actions/AllActions";
import "./Group.css";
import {
  addDatatogroup,
  createNewgroup,
  deleteDatafromgroup,
  editDatafromgroup,
  getCurrentgroup,
  inviteUsertogroup,
  joinGroup,
} from "../Actions/Allgroupexpense";
import { useDispatch, useSelector } from "react-redux";

export default function Group() {
  const placeholder = "text to be copied...";
  const { userData, allgroup, CurrentGroupData, CurrentGroup } = useSelector(
    (state) => state
  );
  const { onCopy, value, setValue, hasCopied } = useClipboard(CurrentGroup);
  useEffect(() => {
    setValue(CurrentGroup);
  }, [CurrentGroup]);
  const dispatch = useDispatch();
  let [patchId, setPatchId] = useState("");
  let [loading, setloading] = useState(false);
  let [deleteId, setdeleteId] = useState("");
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
  ];
  const toast = useToast();
  const { PEXPENCE } = useSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();
  const {
    isOpen: isOpen5,
    onOpen: onOpen5,
    onClose: onClose5,
  } = useDisclosure();
  const cancelRef = React.useRef();
  function addData() {
    let userId = localStorage.getItem("userId");
    let title = document.getElementById("titlegroup").value;
    let date = document.getElementById("dategroup").value;
    let totalBill = document.getElementById("pricegroup").value;
    if (title == "" || totalBill == "" || date == "") {
      toast({
        title: "Add Expense Fail",
        description: "Fill all the details",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      let obj = {
        title,
        date,
        totalBill,
        userId,
      };
      addDatatogroup(obj, dispatch);

      document.getElementById("titlegroup").value = "";
      document.getElementById("dategroup").value = "";
      document.getElementById("pricegroup").value = "";
      toast({
        title: "Expense Added  ",
        description: "",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  }
  function nothing() {}
  function setInput(el) {
    document.getElementById("edittitle").value = el.bill.title;
    document.getElementById("editdate").value = el.bill.date.substring(0, 16);
    document.getElementById("editprice").value = el.bill.totalBill;
  }
  async function sendInvite() {
    let groupName = CurrentGroupData.data.title;
    let name = userData.name;
    let emailname = document.getElementById("friendname").value;
    let email = document.getElementById("friendEmail").value;
    let obj = {
      groupName,
      name,
      email,
      emailname,
    };
    if (emailname == "" || email == "") {
      toast({
        title: "Invite Send Fail",
        description: "Fill all the details",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      let res = await inviteUsertogroup(obj);
      setloading(false);
      if (res.Done) {
        toast({
          title: "Invite Send Succesfully",
          description: "",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Something went Wrong in the server",
          description: "You can use below joining code",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    }
  }
  function patchChange() {
    let userId = localStorage.getItem("userId");
    let title = document.getElementById("edittitle").value;
    let date = document.getElementById("editdate").value;
    let totalBill = document.getElementById("editprice").value;
    let obj = {
      title,
      date,
      totalBill,
      itemId: patchId,
      userId,
    };
    editDatafromgroup(obj, dispatch);
  }
  function fetchedData() {
    let title = document.getElementById("groupName").value;
    let type = document.getElementById("groupType").value;
    if (title == "" || type == "") {
      toast({
        title: "Create Group Fail",
        description: "Fill all the details",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      let obj = {
        title,
        type,
      };
      createNewgroup(dispatch, obj);
    }
  }
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  if (allgroup && allgroup.data && allgroup.data.length != 0) {
    return (
      <div>
        <div id="showAllgroups">
          Switch to :-{" "}
          {allgroup &&
            allgroup.data &&
            allgroup.data.map((el, i) => {
              return (
                <h1
                  key={i * 2 + 23}
                  colorScheme="teal"
                  onClick={() => {
                    getCurrentgroup(el._id, dispatch);
                  }}
                >
                  {el.title}{" "}
                </h1>
              );
            })}
        </div>
        <Divider borderColor="grey.800" mb={"10px"} />
        <div id="topGroup">
          {/* <Button colorScheme="red">Change Group</Button> */}
          <h1>
            Group Name :-{" "}
            {CurrentGroupData &&
              CurrentGroupData.data &&
              CurrentGroupData.data.title}
          </h1>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button colorScheme="purple" onClick={onOpen5}>
              Join group
            </Button>
            <Button colorScheme="blue" onClick={onOpen4}>
              Invite to group
            </Button>
            <Button colorScheme="teal" onClick={onOpen3}>
              Create new group
            </Button>
          </div>
        </div>
        <Divider borderColor="pink.800" mb={"10px"} />

        <div id="inputBox">
          <Input
            placeholder="Description"
            id="titlegroup"
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
              type="number"
              id="pricegroup"
              background="white"
            />
          </InputGroup>
          <Input
            id="dategroup"
            placeholder="Select Date and Time"
            size="md"
            background="white"
            w={"20%"}
            type="datetime-local"
          />
          <Button colorScheme="pink" onClick={addData}>
            Add Expence
          </Button>
        </div>
        {/* <div id>

        </div> */}
        {/*  */}
        <div id="dataparentDiv">
          <div id="dataGroupsall">
            {CurrentGroupData &&
              CurrentGroupData.data &&
              CurrentGroupData.data.bills.map((el, i) => {
                const str = el.bill.date.split("-");
                return (
                  <div
                    className={
                      el.by.name == userData.name ? "divforp" : "divforpnots"
                    }
                    key={i}
                    onClick={
                      el.by.name == userData.name
                        ? async () => {
                            setPatchId(el._id);
                            await onOpen();
                            await setInput(el);
                          }
                        : nothing
                    }
                  >
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginRight: "10px",
                          marginTop: "13px",
                          color: "grey",
                        }}
                      >
                        {" "}
                        <div style={{ fontSize: "17px" }}>
                          {" "}
                          {str[2][0] + "" + str[2][1]}
                        </div>{" "}
                        <div>
                          {str[1] == "12"
                            ? "DEC"
                            : str[1] == "11"
                            ? "NOV"
                            : months[Number(str[1][1]) - 1]}
                        </div>
                      </div>
                      <img
                        className="imgforpe"
                        src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                        alt=""
                      />
                    </div>
                    <div
                      className="titleNames"
                     
                    >
                      <h3>{el.bill.title} </h3>{" "}
                      <Badge variant="outline" colorScheme="green">
                        {el.by.name}
                      </Badge>
                    </div>{" "}
                    <div style={{display:"flex"}}>
                      {" "}
                      <div
                        style={{
                          borderRight: "0.5px solid #cfcdcd",
                          padding: "6px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        {" "}
                        <div style={{ color: "grey", fontSize: "12px" }}>
                          {" "}
                          you paid{" "}
                        </div>{" "}
                        <div style={{ fontSize: "18px" }}>
                          ₹{el.bill.totalBill}{" "}
                        </div>{" "}
                      </div>{" "}
                      <div
                        style={{
                          padding: "6px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {" "}
                        <div style={{ color: "grey", fontSize: "12px" }}>
                          {" "}
                          you lent{" "}
                        </div>{" "}
                        <div style={{ fontSize: "18px" , color:"#0ab94e"}}>
                          ₹{Math.round(el.bill.totalBill/Number(CurrentGroupData.data.members.length))}{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <FiXCircle
                      fontSize={"18px"}
                      color={"brown"}
                      onClick={
                        el.by.name == userData.name
                          ? async (event) => {
                              event.stopPropagation();
                              setdeleteId(el._id);
                              onOpen1();
                            }
                          : nothing
                      }
                    />
                  </div>
                );
              })}
          </div>
          <div id="groupMember">
            <h1>ALL MEMBER</h1>
            {CurrentGroupData &&
              CurrentGroupData.data &&
              CurrentGroupData.data.balanceofUsers.map((el, i) => {
                return (
                  <div key={i}>
                    {" "}
                    <Avatar size={"md"} src={el.user.avatar} />{" "}

                    <div className="allmemberss" > 
                    <h1> {el.user.name}</h1>{" "}
                    
                     {el.info.youGive!=0?<div className="youGive"> <h1  >owes</h1> <h1>₹ {el.info.youGive} </h1></div> :<div className="youTake" > <h1 >get back</h1> <h1>₹ {el.info.youTake} </h1></div> }
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div id="createnewGroup">
          <Modal onClose={onClose3} size={"xs"} isOpen={isOpen3}>
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
                  <Button
                    colorScheme="teal"
                    onClick={async () => {
                      await fetchedData();
                      await onClose3();
                    }}
                  >
                    Create
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <div id="joinGroup">
          <Modal onClose={onClose5} size={"xs"} isOpen={isOpen5}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader bg="purple.500" h={"30px"} color="white">
                Join group
              </ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody>
                <Input
                  placeholder="Enter Join Code"
                  id="joinGroupid"
                  background="white"
                  w={"100%"}
                  mb={"8px"}
                />

                <h2
                  style={{
                    color: "grey",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  Enter your joining code
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "6px",
                  }}
                >
                  <Button
                    colorScheme="purple"
                    onClick={async () => {
                      let res = document.getElementById("joinGroupid").value;
                      await joinGroup(res, dispatch);
                      await onClose5();
                    }}
                  >
                    Join Now !
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <div id="invitenewGroup">
          <Modal onClose={onClose4} size={"xs"} isOpen={isOpen4}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader bg="blue.600" h={"30px"} color="white">
                Invite to{" "}
                {CurrentGroupData &&
                  CurrentGroupData.data &&
                  CurrentGroupData.data.title}{" "}
                Group
              </ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody>
                <Input
                  placeholder="Enter name"
                  id="friendname"
                  background="white"
                  w={"100%"}
                  mb={"8px"}
                />
                <Input
                  placeholder="Enter Friend Email"
                  type={"email"}
                  id="friendEmail"
                  background="white"
                  w={"100%"}
                  mb={"8px"}
                />
                <h2
                  style={{
                    color: "grey",
                    fontSize: "14px",
                    marginTop: "10px",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "6px",
                    }}
                  >
                    <Button
                      colorScheme="blue"
                      onClick={async () => {
                        await setloading(true);
                        await sendInvite();
                        await onClose4();
                      }}
                      disabled={loading ? true : false}
                    >
                      {loading ? "Sended" : "Send Invite"}
                    </Button>
                  </div>
                  Or
                </h2>
                <div>
                  <Flex mb={2}>
                    <Input
                      style={{ border: "3px solid green" }}
                      color="green"
                      placeholder={placeholder}
                      value={value}
                      mr={2}
                    />
                    <Button colorScheme="green" onClick={onCopy}>
                      {hasCopied ? "Copied!" : "Copy"}
                    </Button>
                  </Flex>
                </div>
                <h2
                  style={{
                    color: "grey",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  You can direct send this joining code !
                </h2>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <div id="path&delete">
          <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader bg="pink.500" h={"30px"} color="white">
                Edit Expense
              </ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody>
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <img
                    className="imgforpxx"
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
                    <InputGroup w={"85%"}>
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
                      w={"85%"}
                      type="datetime-local"
                    />{" "}
                  </div>
                </div>
                <Input
                  placeholder="Description"
                  id="edittitle"
                  background="white"
                  w={"103%"}
                />{" "}
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    colorScheme="pink"
                    onClick={async () => {
                      await patchChange();
                      await onClose();
                    }}
                  >
                    Edit Expence
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>

          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose1}
            isOpen={isOpen1}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>
                Sure you want to delete an Expense?
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody></AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose1}>
                  No
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={async () => {
                    await deleteDatafromgroup(deleteId, dispatch);
                    await onClose1();
                  }}
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {" "}
        <div>
          <div id="joiningOnly">
            <Button colorScheme="purple" onClick={onOpen5}>
              Join group
            </Button>
            <Button colorScheme="teal" onClick={onOpen3}>
              Create new group
            </Button>
          </div>
        </div>
        <div id="imgfromgroup">
          <img
            src="https://cdn.dribbble.com/users/68398/screenshots/5864834/16.gif"
            alt=""
          />
        </div>
        <div id="createnewGroup">
          <Modal onClose={onClose3} size={"xs"} isOpen={isOpen3}>
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
                  <Button
                    colorScheme="teal"
                    onClick={async () => {
                      await fetchedData();
                      await onClose3();
                    }}
                  >
                    Create
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <div id="joinGroup">
          <Modal onClose={onClose5} size={"xs"} isOpen={isOpen5}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader bg="purple.500" h={"30px"} color="white">
                Join group
              </ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody>
                <Input
                  placeholder="Enter Join Code"
                  id="joinGroupid"
                  background="white"
                  w={"100%"}
                  mb={"8px"}
                />

                <h2
                  style={{
                    color: "grey",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  Enter your joining code
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "6px",
                  }}
                >
                  <Button
                    colorScheme="purple"
                    onClick={async () => {
                      let res = document.getElementById("joinGroupid").value;
                      await joinGroup(res, dispatch);
                      await onClose5();
                    }}
                  >
                    Join Now !
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </>
    );
  }
}
