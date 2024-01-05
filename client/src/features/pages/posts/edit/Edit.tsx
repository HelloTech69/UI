import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiArrowLeft, FiList, FiRefreshCcw, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
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
  Textarea,
  useColorModeValue as mode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { useCategoryStore, usePostStore } from "~shared/store";

import { ICategory, IPost } from "~features/interfaces";

export const PostEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IPost>();
  const toast = useToast();
  const navigate = useNavigate();
  const { posts, updatePost } = usePostStore();
  const { categories } = useCategoryStore();

  const [post, setPost] = useState<IPost>();

  const { id } = useParams<{ id: string }>();

  const populatePost = (post: IPost, category: ICategory) => {
    setValue("title", post.title);
    setValue("status", post.status);
    setValue("category.id", category.id);
    setValue("content", post.content);
  };

  const refreshPost = async () => {
    // TODO: Add actual API call to get post by id from database
  };

  useEffect(() => {
    const post = posts.find((post) => post.id === Number(id));
    const category = categories.find(
      (category) => category.id === post?.category.id,
    );
    setPost(post);
    if (post && category) {
      populatePost(post, category);
    }
  }, []);

  const onSubmit: SubmitHandler<IPost> = (data) => {
    const categoryId =
      typeof data.category.id === "string"
        ? parseInt(data.category.id, 10)
        : data.category.id;

    const createdAt = post
      ? post.createdAt
      : format(new Date(), "MMMM d, yyyy h:mm aa");

    const newPost = {
      ...data,
      id: Number(id),
      category: { id: categoryId },
      createdAt: createdAt,
    };
    updatePost(newPost);

    // TODO: Add actual API call to edit post in database
    toast({ title: "Post updated Successfully", status: "success" });
    navigate("/posts");
  };

  return (
    <Box p={4} bg={mode("white", "gray.800")} pb={8}>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        mb={4}
        alignItems={{ base: "flex-start", sm: "center" }}
      >
        <VStack spacing={3} alignItems="flex-start">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/posts" fontSize={18}>
                Posts
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/posts/edit/${id}`} fontSize={18}>
                Edit
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
              Edit Post
            </Text>
          </HStack>
        </VStack>
        <HStack>
          <Button leftIcon={<FiList />} as="a" href="/posts" variant="outline">
            Posts
          </Button>
          <Button
            leftIcon={<FiRefreshCcw />}
            onClick={refreshPost}
            variant="outline"
          >
            Refresh
          </Button>
        </HStack>
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
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
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
            <FormErrorMessage>
              {errors.status && errors.status.message}
            </FormErrorMessage>
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
            <FormErrorMessage>
              {errors.category?.id && errors.category?.id.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel htmlFor="content">Content</FormLabel>
            <Textarea
              id="content"
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
              Save
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};
