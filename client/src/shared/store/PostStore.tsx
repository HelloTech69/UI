import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PostStateType } from "~shared/types";

export const usePostStore = create<PostStateType>()(
  persist(
    (set) => ({
      posts: [],

      addPost: (newPost) =>
        set((state) => ({ posts: [...state.posts, newPost] })),

      removePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),

      updatePost: (updatedPost) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post,
          ),
        })),

      setPosts: (newPosts) => set({ posts: newPosts }),
    }),
    {
      name: "post-storage",
    },
  ),
);
