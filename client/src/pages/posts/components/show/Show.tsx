import { useEffect, useState } from "react";
import { FiArrowLeft, FiEdit, FiList, FiRefreshCcw } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  useColorModeValue as mode,
  VStack,
} from "@chakra-ui/react";

import { useCategoryStore, usePostStore } from "~shared/store";

import { ICategory, IPost } from "~features/interfaces";

export const PostShow = () => {
  const { posts } = usePostStore();
  const { categories } = useCategoryStore();

  const [post, setPost] = useState<IPost>();
  const [category, setCategory] = useState<ICategory>();

  const { id } = useParams<{ id: string }>();

  const refreshPost = async () => {
    // TODO: Add actual API call to get post by id from database
  };

  useEffect(() => {
    const post = posts.find((post) => post.id === Number(id));
    const category = categories.find(
      (category) => category.id === post?.category.id,
    );
    setPost(post);
    setCategory(category);
  }, []);

  return (
    <Box p={4} bg={mode("white", "gray.800")} pb={8}>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        mb={4}
        alignItems={{ base: "flex-start", sm: "center" }}
      >
        <VStack spacing={3} alignItems="flex-start" mb={{ base: "2", sm: "0" }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/posts" fontSize={18}>
                Posts
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/posts/show/${id}`} fontSize={18}>
                Show
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <HStack justifyContent="left" alignItems="center">
            <IconButton
              aria-label="Back"
              icon={<FiArrowLeft />}
              as="a"
              href="/posts"
              variant="ghost"
            />
            <Text fontSize="xl" as="b">
              Show Post
            </Text>
          </HStack>
        </VStack>
        <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
          <Button leftIcon={<FiList />} as="a" href="/posts" variant="outline">
            Posts
          </Button>
          <Button
            leftIcon={<FiEdit />}
            colorScheme="blue"
            as="a"
            href={`/posts/edit/${id}`}
            variant="outline"
          >
            Edit
          </Button>
          <Button
            leftIcon={<FiRefreshCcw />}
            onClick={refreshPost}
            variant="outline"
          >
            Refresh
          </Button>
        </Stack>
      </Flex>
      <VStack align="start" spacing={4}>
        <Heading as="h5" size="sm">
          Id
        </Heading>
        <Text>{post?.id}</Text>

        <Heading as="h5" size="sm">
          Title
        </Heading>
        <Text>{post?.title}</Text>

        <Heading as="h5" size="sm">
          Status
        </Heading>
        <Text>{post?.status}</Text>

        <Heading as="h5" size="sm">
          Category
        </Heading>
        <Text>{category?.title}</Text>

        <Heading as="h5" size="sm">
          Content
        </Heading>
        <ReactMarkdown>{post?.content}</ReactMarkdown>
      </VStack>
    </Box>
  );
};
