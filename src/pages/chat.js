import {
  Flex,
  Box,
  Textarea,
  FormControl,
  Stack,
  Button,
  Text,
  Divider,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { React, useState, useEffect, useRef,useContext  } from "react";
import { username_data } from "@/context/username";
import Image from "next/image";
import userjpg from "../assets/user.jpg";
import { useFormik } from "formik";
const ws = new WebSocket("ws://localhost:8080");
export default function ChatPage() {
  const { userName} = useContext(username_data);
  const router=useRouter();
  
  const messageForm = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values) => {
      if (values.message.trim() !== "") {
        SendMessage(values.message);
      }
    },
  });
  const connctToast = useToast({
    position: "bottom-left",
    title: "Connection Established",
    status: "success",
    isClosable: true,
  });
  const errToast = useToast({
    position: "bottom-left",
    title: "Error!",
    description: "disconnected from server",
    status: "error",
    isClosable: true,
  });
  const probToast = useToast({
    position: "bottom-left",
    title: "Error!",
    description: "please try after some time",
    status: "error",
    isClosable: true,
  });
  const [messageList, setMessageList] = useState([]);
  let bottomScroll = useRef(null);
  const SendMessage = async (message) => {
    let date = new Date();
    const userData = {
      username: userName,
      message: message,
      time: date.toLocaleTimeString("en-IN", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    if (ws.readyState == 1) {
      ws.send(JSON.stringify(userData));
      messageForm.resetForm();
    } else {
      errToast();
    }
  };
  useEffect(() => {
    ws.onmessage = function (event) {
      const obj = JSON.parse(event.data);
      setMessageList((list) => [...list, obj]);
    };
    ws.onopen = () => {
      connctToast();
    };
    ws.onclose = () => {
      errToast();
    };
    ws.onerror = () => {
      probToast();
    };
  }, [ws]);
  useEffect(() => {
    bottomScroll.current?.scrollBy({
      behavior: "smooth",
      top: bottomScroll.current?.firstChild?.lastChild?.offsetTop,
    });
  }, [messageList]);
  useEffect(()=>{
    if(userName===""){
      router.push('/');
    }
  },[]);
  return (
    <Flex bgColor={"transparent"}>
      <Flex w={"20%"}>
        <Box h={"100vh"} w={"100%"} bgColor={"white"}>
          <Text
            color={"blue.400"}
            fontWeight={"extrabold"}
            fontSize={"5xl"}
            align={"center"}
          >
            CHAT
          </Text>
          <Text
            color={"blue.400"}
            fontWeight={"extrabold"}
            fontSize={"5xl"}
            align={"center"}
          >
            SERVER
          </Text>
          <Text align={'center'} fontWeight={'bold'} fontSize={'2xl'}>
            Your Username:
          </Text>
          <Text align={'center'} fontWeight={'bold'} fontSize={'2xl'}>{userName}</Text>
        </Box>
      </Flex>
      <Flex
        direction={"column"}
        h={"100vh"}
        justify={"center"}
        align={"center"}
        bgColor={"gray.100"}
        w={"80%"}
        boxShadow={
          "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
        }
      >
        <Box
          ref={bottomScroll}
          bgColor={"#FFD0D0"}
          h={"80vh"}
          w={"95%"}
          borderRadius={"2.5rem"}
          mb={"2rem"}
          overflow={"scroll"}
          overflowX={"hidden"}
        >
          <Flex px={"1rem"} borderRadius={"1rem"} direction={"column"}>
            {messageList.map((content) => {
              return (
                <Stack
                  boxShadow={
                    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                  }
                  key={content.count}
                  bgColor={"#FF9EAA"}
                  borderRadius={"2rem"}
                  my={"1rem"}
                  direction={"row"}
                  align={"center"}
                  w={"fit-content"}
                  maxW={"90%"}
                >
                  <Flex align={"center"} gap={"1rem"} px={"1rem"}>
                    <Flex
                      direction={"column"}
                      justify={"center"}
                      align={"center"}
                      my={"0.5rem"}
                    >
                      <Image
                        alt="userImage"
                        style={{ borderRadius: "50%" }}
                        src={userjpg}
                        height={"50"}
                        width={"50"}
                      />
                      <Text color={"black"} fontWeight={"bold"}>
                        {content.username}
                      </Text>
                    </Flex>
                    <Divider
                      orientation="vertical"
                      borderColor={"blackAlpha.400"}
                      h={"2rem"}
                      borderWidth={"1px"}
                    />
                    <Tooltip label={content.time}>
                      <Flex direction={"column"}>
                        <Text overflowWrap={"anywhere"} color={"black"}>
                          {content.message}
                        </Text>
                      </Flex>
                    </Tooltip>
                  </Flex>
                  <Box></Box>
                </Stack>
              );
            })}
          </Flex>
        </Box>
        <Box px={"1rem"} bg={"#FFD0D0"} borderRadius={"1rem"} w={"95%"}>
          <form onSubmit={messageForm.handleSubmit}>
            <FormControl>
              <Stack
                w={"100%"}
                direction={"row"}
                align={"center"}
                h={"fit-content"}
                minH={"3rem"}
              >
                <Text
                  fontSize={"1rem"}
                  color={"black"}
                  h={"100%"}
                  fontWeight={"bold"}
                >
                  You:
                </Text>
                <Textarea
                  name="message"
                  value={messageForm.values.message}
                  onChange={messageForm.handleChange}
                  isRequired
                  pe={"1rem"}
                  ps={"1rem"}
                  overflow={"hidden"}
                  resize={"vertical"}
                  borderRadius={"1rem"}
                  placeholder="Enter Your Message here"
                  bgColor={"white"}
                  color={"black"}
                  onKeyDown={(e) => {
                    if (e.code === "Enter") {
                      messageForm.handleSubmit();
                    }
                  }}
                />
                <Button
                  h={"2.5rem"}
                  type="submit"
                  variant={"solid"}
                  w={"4rem"}
                  borderRadius={"1rem"}
                >
                  Send
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}
