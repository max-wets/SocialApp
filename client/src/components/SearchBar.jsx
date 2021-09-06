import React, { useState, useEffect, useContext } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function SearchBar() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [user]);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.username.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setText(text);
  };

  return (
    <VStack position="absolute" left="120px" top="8px" spacing={0}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.500" />}
        />
        <Input
          h="35px"
          bg="white"
          type="text"
          placeholder="Search someone..."
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
        />
      </InputGroup>
      <Box mt="4px" maxH="250px" w="99%" overflowY="auto" zIndex="6">
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <Link to="#" style={{ textDecoration: "none" }}>
              <HStack
                bg="white"
                key={i}
                p="4px"
                _hover={{ backgroundColor: "blue.200" }}
                cursor="pointer"
              >
                <Avatar
                  size="md"
                  name={suggestion.username}
                  src={suggestion.profilePicture}
                  cursor="pointer"
                />
                <Text
                  h="14px"
                  fontWeight="500"
                  position="relative"
                  top="-5px"
                  style={{ textDecoration: "none" }}
                >
                  {suggestion.username}
                </Text>
              </HStack>
            </Link>
          ))}
      </Box>
    </VStack>
  );
}

export default SearchBar;
