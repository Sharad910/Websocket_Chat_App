import { React, useContext } from "react";
import {
  Button,
  Flex,
  FormControl,
  Input,
  Stack,
  Box,
  Text,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { username_data } from "@/context/username";
import Image from "next/image";
import userjpg from "../assets/user.jpg";
import { useRouter } from "next/router";
export default function Land() {
  const { userName, setUserName } = useContext(username_data);
    const router=useRouter();
let handleChange=(e)=>{
    setUserName(e.target.value);
}
let handleSubmit=(e)=>{
    e.preventDefault();
    router.push('/chat')
}
  return (
    <Flex>
      <Flex
        w={"40%"}
        align={"center"}
        justify={"center"}
        bgColor={"blue.100"}
        h={"100vh"}
      >
        <Box
          boxShadow={
            "rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px"
          }
          transform={"skew(5deg,-3deg)"}
          h={"35rem"}
          w={"20rem"}
          borderRadius={"1rem"}
          bgColor={"white"}
        >
          <Flex direction={"column"} align={"center"}>
            <Text
              fontWeight={"bold"}
              fontSize={"3xl"}
              color={"blue.400"}
              align={"center"}
            >
              Chat Server
            </Text>
            <Text
              fontWeight={"bold"}
              fontSize={"l"}
              color={"blue.400"}
              align={"center"}
            >
              Username
            </Text>
            <Box
              m={"1rem"}
              h={"25rem"}
              w={"95%"}
              borderRadius={"1rem"}
              bgColor={"#FFD0D0"}
            ></Box>
            <InputGroup w={'90%'} borderColor={'blue.300'} >
              <Input
                isReadOnly
                placeholder="Type your message here"
              />
              <InputRightElement>
                <ChevronRightIcon boxSize={7}  color={"blue.400"} />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Box>
      </Flex>
      <Flex w={"60%"} justify={"center"} align={"center"}>
        <Stack>
          <Image
            alt="userImage"
            style={{ borderRadius: "50%" }}
            src={userjpg}
            height={500}
            width={500}
          />
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Stack>
                <Input value={userName} name="user" onChange={handleChange} isRequired placeholder="Enter Your Username Here" />
                <Button bgColor={"#FFD0D0"} type="submit">
                  Submit
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Stack>
      </Flex>
    </Flex>
  );
}
