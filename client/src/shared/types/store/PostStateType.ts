import { IPost } from "~features/interfaces";

export interface PostStateType {
  posts: IPost[];
  addPost: (newPost: IPost) => void;
  removePost: (id: number) => void;
  updatePost: (updatedPost: IPost) => void;
  setPosts: (newPosts: IPost[]) => void;
}
