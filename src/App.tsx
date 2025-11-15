import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  List,
  Text,
} from "@chakra-ui/react";
import { FaPen, FaTrash } from "react-icons/fa";

import { Todo } from "./types/todo";

function App() {
  const [todoRecords, setTodoRecords] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    const { data: todo, error } = await supabase.from("todo").select("*");

    if (error) {
      console.log("Error: ", error);
      setLoading(false);
    } else {
      const todoItems = todo.map((item) => {
        return new Todo(
          item.id,
          item.created_at,
          item.title,
          item.time,
          item.completed
        );
      });

      setTodoRecords(todoItems);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      {loading ? (
        <Text textAlign="center">Loading...</Text>
      ) : (
        <Box w="100%" p="1rem">
          <Heading as="h1" size="5xl" textAlign="center" mb="2rem" w="100%">
            シン・学習記録アプリ
          </Heading>

          <Box maxW="500px" mx="auto" w="100%">
            <Box textAlign="right" mb="1rem">
              <Button bg="blue.500" color="white">
                新規登録
              </Button>
            </Box>

            <Flex
              align="center"
              mb="0.5rem"
              p="0 0.5rem 1rem"
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <Text flex="3">学習内容</Text>
              <Text flex="2">学習時間</Text>
              <Text flex="1"></Text>
              <Text flex="1"></Text>
            </Flex>

            <List.Root>
              {todoRecords.map((todoRecord) => (
                <List.Item
                  key={todoRecord.id}
                  listStyle="none"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                >
                  <Flex align="center" px="0.5rem" py="0.4rem" mb="0.3rem">
                    <Text flex="3">{todoRecord.title}</Text>
                    <Text flex="2">{todoRecord.time}時間</Text>

                    <Box flex="1" textAlign="center">
                      <IconButton aria-label="edit" size="sm" variant="ghost">
                        <FaPen />
                      </IconButton>
                    </Box>

                    <Box flex="1" textAlign="center">
                      <IconButton aria-label="delete" size="sm" variant="ghost">
                        <FaTrash />
                      </IconButton>
                    </Box>
                  </Flex>
                </List.Item>
              ))}
            </List.Root>
          </Box>
        </Box>
      )}
    </>
  );
}

export default App;
