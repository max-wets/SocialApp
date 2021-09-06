import {
  Container,
  Center,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spacer,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import About from "./About";
import Feed from "./Feed";
import Friends from "./Friends";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function ProfileMenu({ userData, friends }) {
  return (
    <>
      {/* <Container maxW="50%" bg="white" pr={0} pl={0}> */}
      <Tabs isFitted variant="enclosed">
        <Container maxW="55%">
          <TabList>
            <Tab>About</Tab>
            <Tab>Feed</Tab>
            <Tab>Friends</Tab>
          </TabList>
        </Container>
        <Box w="100%" h="10px" bg="gray.100" />
        <Box bg="gray.100" maxH="100%">
          <Container maxW="50%" bg="white" minW="500px" padding={0}>
            <TabPanels>
              <TabPanel p={0}>
                <About userData={userData} />
              </TabPanel>
              <TabPanel p={0}>
                <Feed />
              </TabPanel>
              <TabPanel p={0}>
                <Friends userData={userData} friends={friends} />
              </TabPanel>
            </TabPanels>
          </Container>
        </Box>
      </Tabs>
    </>
  );
}

export default ProfileMenu;
