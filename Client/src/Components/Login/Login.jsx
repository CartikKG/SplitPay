import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {loginUser} from '../Actions/AllActions'
import { OAuthButtonGroup } from "../Signup/OAuthButtonGroup";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const toast = useToast();
  const {isLogin, userData}=useSelector((state)=>state);
  if(!isLogin && localStorage.getItem('userId')){
    const token=  localStorage.getItem("userToken");
    loginUser(token,dispatch)
  }
  const handleSignin = async () => {
    document.getElementById("signin").innerText = "Loading.....";

    document.getElementById("signin").disabled = true;
    let obj = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    if (obj.email === "" || obj.password === "") {
      toast({
        title: "Login Failed!!",
        description: "Fill all the details to Login..",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      document.getElementById("signin").innerText = "Sign in";
      document.getElementById("signin").disabled = false;
    } else {
      // console.log("inside");
      let res = await fetch(
        `${process.env.REACT_APP_URL_API}/users/login`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(obj),
        }
      );
      let data2 = await res.json();
      // console.log(res);
      // console.log(data2.data);
      if (data2.data === " User Not Found with this email") {
        toast({
          title: "User Not Found with given Mail ID",
          description: "Please Signup to continue..",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        navigate("/signup");
      } else if (data2.data === "password is incorrect") {
        toast({
          title: "Login Failed!!",
          description: "Password is Incorrect",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        document.getElementById("password").value = "";
        document.getElementById("signin").innerText = "Sign in";
        document.getElementById("signin").disabled = false;
      } else {
        localStorage.setItem("userToken", data2.data);
        loginUser(data2.data,dispatch)
        // let res2 = await fetch(`http://localhost:3005/users`, {
        //   method: "GET",
        //   headers: { Authorization: data2.data },
        // });
        // let { data } = await res2.json();
        // // console.log(data);
        // let arr = data.filter((el) => {
        //   return el.email === obj.email;
        // });
        // // console.log(arr);
        // localStorage.setItem("userId", arr[0]._id);
        toast({
          title: "Login Successful!!",
          description: "Continue Shopping..",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
        navigate("/");
      }
    }
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "1",
        md: "4",
      }}
      px={{
        base: "0",
        sm: "1",
      }}
    >
      <Stack spacing="">
        <Stack spacing="2">
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <br />
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Link to={"/signup"}>
                <Button variant="solid">Sign up</Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "transparent",
            sm: "bg-surface",
          })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Password</FormLabel>
                <Input id="password" type="password" />
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                id="signin"
                variant="solid"
                onClick={handleSignin}
                colorScheme="pink"
              >
                Sign in
              </Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
