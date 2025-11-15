import { Box, Flex, IconButton, List, Text } from "@chakra-ui/react";
import { FaPen, FaTrash } from "react-icons/fa";

import type { Todo } from "../types/todo";

type RecordListProps = {
  todoRecords: Todo[];
};

export const RecordList = ({ todoRecords }: RecordListProps) => {
  return (
    <>
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
        {todoRecords.map((todoRecord: Todo) => (
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
    </>
  );
};
