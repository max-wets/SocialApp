import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Avatar,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { HiUserRemove } from "react-icons/hi";
import axios from "axios";
import {axiosInstance} from "../../config"
import { AuthContext } from "../../context/AuthContext";

function Friend({ friend, isUserProfile }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);
  console.log(PF);

  const handleClickAddRecommended = async () => {
    try {
      await axiosInstance.post(`/friends/${friend.friendId}/add`, {
        userId: user.userId,
      });
      dispatch({ type: "ADD_RECOMMENDED_FRIEND", payload: friend.friendId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickRemove = async () => {
    try {
      await axiosInstance.put(`/friends/${friend.friendId}/remove`, {
        userId: user.userId,
      });
      dispatch({ type: "REMOVE_FRIEND", payload: friend.friendId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickAccept = async () => {
    try {
      await axiosInstance.put(`/friends/${friend.friendId}/accept`, {
        userId: user.userId,
      });
      dispatch({ type: "ACCEPT_FRIEND", payload: friend.friendId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      h="80px"
      alignItems="center"
      border="1px solid lightgray"
      borderRadius="5%"
      pr="10px"
      pl="10px"
    >
      <HStack>
        <Avatar
          size="md"
          name={friend.username || "unknown user"}
          src={PF + friend.profilePicture || PF + "person/noAvatar.jpg"}
          cursor="pointer"
        />
        <Text h="14px" fontWeight="500" position="relative" top="-5px">
          {friend.username || "unknown user"}
        </Text>
      </HStack>
      <Spacer />
      {(() => {
        if (isUserProfile) {
          switch (friend.status) {
            case "en attente de confirmation":
              return (
                <VStack>
                  <Button
                    fontSize="12px"
                    fontWeight="600"
                    color="white"
                    bg="blue.400"
                    w="45px"
                    h="25px"
                    p={3}
                    borderRadius="50%"
                    onClick={handleClickAccept}
                  >
                    <Text>Accept</Text>
                  </Button>
                  <Button
                    fontSize="12px"
                    fontWeight="600"
                    color="white"
                    bg="red.400"
                    w="45px"
                    h="25px"
                    p={3}
                    borderRadius="50%"
                    onClick={handleClickRemove}
                  >
                    <Text>Ignore</Text>
                  </Button>
                </VStack>
              );
            case "recommandé":
              return (
                <VStack>
                  <Button
                    fontSize="12px"
                    fontWeight="600"
                    color="white"
                    bg="blue.400"
                    w="45px"
                    h="25px"
                    p={3}
                    borderRadius="50%"
                  >
                    <Text>Invite</Text>
                  </Button>
                  <Button
                    fontSize="12px"
                    fontWeight="600"
                    color="white"
                    bg="red.400"
                    w="45px"
                    h="25px"
                    p={3}
                    borderRadius="50%"
                  >
                    <Text>Ignore</Text>
                  </Button>
                </VStack>
              );
            default:
              return (
                <Flex
                  bg="gray.100"
                  cursor="pointer"
                  w="25px"
                  h="25px"
                  borderRadius="50%"
                  alignItems="center"
                  justifyContent="center"
                  onClick={handleClickRemove}
                >
                  <HiUserRemove />
                </Flex>
              );
          }
        }
      })()}
    </Flex>
  );
}

export default Friend;