import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

import { Todo } from "./types/todo";
import { RecordList } from "./components/RecordList";

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
            <RecordList todoRecords={todoRecords} />
          </Box>
        </Box>
      )}
    </>
  );
}

export default App;
