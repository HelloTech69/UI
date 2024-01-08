import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "~shared/routes/PrivateRoute";

import { useHead } from "~contexts/title/TitleContext";

import { PostCreate, PostEdit, PostList, PostShow } from "./index";

const Posts = () => {
  const updateHead = useHead();
  useEffect(() => {
    updateHead("Posts", {
      description: "Posts",
      keywords: "Posts",
    });
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoute resourceRequested="listpost" />}>
        <Route index element={<PostList />} />
      </Route>
      <Route element={<PrivateRoute resourceRequested="createpost" />}>
        <Route path="create" element={<PostCreate />} />
      </Route>
      <Route element={<PrivateRoute resourceRequested="editpost" />}>
        <Route path="edit/:id" element={<PostEdit />} />
      </Route>
      <Route element={<PrivateRoute resourceRequested="showpost" />}>
        <Route path="show/:id" element={<PostShow />} />
      </Route>
      {/* <Route index element={<PostList />} />
      <Route path="show/:id" element={<PostShow />} />
      <Route path="create" element={<PostCreate />} />
      <Route path="edit/:id" element={<PostEdit />} /> */}
    </Routes>
  );
};

export default Posts;
