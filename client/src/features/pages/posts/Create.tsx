import { SubmitHandler, useForm } from "react-hook-form";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { useCategoryStore, usePostStore } from "~shared/store";

import { IPost } from "~features/interfaces";

export const PostCreate = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>();
  const { categories } = useCategoryStore();
  const { posts, addPost } = usePostStore();

  const onSubmit: SubmitHandler<IPost> = (data) => {
    const categoryId =
      typeof data.category.id === "string"
        ? parseInt(data.category.id, 10)
        : data.category.id;

    const newId = posts.length + 1;

    const createdAt = format(new Date(), "MMMM d, yyyy h:mm aa");

    const newPost = {
      ...data,
      id: newId,
      category: { id: categoryId },
      createdAt: createdAt,
    };
    addPost(newPost);

    // TODO: Add actual API call to add post to database
    toast({ title: "Post Created Successfully", status: "success" });
    navigate("/posts");
  };

  return (
    <Box p="4" bg="white" pb={8}>
      <Flex justifyContent="left" mb={4} alignItems="center">
        <VStack spacing={3} alignItems="flex-start">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/posts" fontSize={18}>
                Posts
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/posts/create" fontSize={18}>
                Create
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
              Create Post
            </Text>
          </HStack>
        </VStack>
      </Flex>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.status}>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select
              id="status"
              placeholder="Select Status"
              {...register("status", { required: "Status is required" })}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="rejected">Rejected</option>
            </Select>
            <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.category?.id}>
            <FormLabel htmlFor="categoryId">Category</FormLabel>
            <Select
              id="categoryId"
              placeholder="Select Category"
              {...register("category.id", { required: "Category is required" })}
            >
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.title}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.category?.id?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel htmlFor="content">Content</FormLabel>
            <Input
              id="content"
              type="text"
              {...register("content", { required: "Content is required" })}
            />
            <FormErrorMessage>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>

          <Flex width="full" justifyContent="flex-end">
            <Button
              mt={4}
              leftIcon={<FiSave />}
              colorScheme="green"
              type="submit"
            >
              Create
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};
