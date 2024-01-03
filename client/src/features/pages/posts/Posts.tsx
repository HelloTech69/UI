import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// import PrivateRoute from "~shared/PrivateRoute";
import { useHead } from "~features/title/TitleContext";

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
      {/* <Route element={<PrivateRoute resourceRequested="postlist" />}>
                <Route index element={<PostList />} />
            </Route>
            <Route element={<PrivateRoute resourceRequested="postcreate" />}>
                <Route path="create" element={<PostCreate />} />
            </Route>
            <Route element={<PrivateRoute resourceRequested="postedit" />}>
                <Route path="edit/:id" element={<PostEdit />} />
            </Route>
            <Route element={<PrivateRoute resourceRequested="postshow" />}>
                <Route path="show/:id" element={<PostShow />} />
            </Route> */}
      <Route index element={<PostList />} />
      <Route path="show/:id" element={<PostShow />} />
      <Route path="create" element={<PostCreate />} />
      <Route path="edit/:id" element={<PostEdit />} />
    </Routes>
  );
};

export default Posts;
