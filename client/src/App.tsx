import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  useColorModeValue as mode,
  useDisclosure,
} from "@chakra-ui/react";

import PrivateRoute from "~shared/PrivateRoute";
import PublicRoute from "~shared/PublicRoute";
import { useAuthStore } from "~shared/store";

import { useAuth } from "~features/auth";

// Private Component
const DashboardPage = lazy(() => import("~features/pages/dashboard/Dashboard"));
const PostsPage = lazy(() => import("~features/pages/posts/Posts"));
const TaskListPage = lazy(() => import("~features/pages/task/TaskList"));

// Public Component
const LandingPage = lazy(() => import("~features/pages/landing/Landing"));
const LoginPage = lazy(() => import("~features/pages/login/Login"));
const RegisterPage = lazy(() => import("~features/pages/register/Register"));

// Shared Component
const Sidebar = lazy(() => import("~shared/components/sidebar/Sidebar"));
const Navbar = lazy(() => import("~shared/components/navbar/Navbar"));
const Footer = lazy(() => import("~shared/components/footer/Footer"));
const Loader = lazy(() => import("~shared/components/loader/Loader"));
const NotFound = lazy(() => import("~shared/components/notfound/NotFound"));

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth-storage" && !event.newValue) {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            username: "SONG JIHOON _",
            email: "jihoon.song.2022@smu.edu.sg",
            picture:
              "https://lh3.googleusercontent.com/a/ACg8ocKQwvTl5W_9Tam4hUaao-fqPtVxO68o8xBMelJWreAc=s96-c",
            id: "cd530825-0dc2-4b2d-8152-ce9904efdcfb",
            createdAt: "2024-01-06T07:25:15.103Z",
            updatedAt: "2024-01-06T07:25:15.103Z",
          },
          role: {
            name: "User",
            roles: [
              "org.user",
              "org.permissions.posts.list",
              "org.permissions.posts.show",
              "org.permissions.posts.create",
              "org.permissions.one.read",
              "org.permissions.three.read",
            ],
          },
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Flex direction="column" minH="100vh" bg={mode("gray.100", "gray.900")}>
      <Suspense fallback={<Loader />}>
        {isAuthenticated ? (
          <Sidebar
            onClose={() => onClose}
            display={{ base: "none", lg: "block" }}
          />
        ) : null}
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
        >
          <DrawerContent>
            <Sidebar onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Navbar onOpen={onOpen} />
        <Box flex="1" ml={isAuthenticated ? { base: 0, lg: 60 } : 0} p="8">
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* This is public route, later can add check to redirect authenticated user back to dashboard */}
              <Route element={<PublicRoute strict={true} />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
              </Route>

              {/* This is private route, only authenticated user can access this route */}
              <Route element={<PrivateRoute resourceRequested="dashboard" />}>
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>
              {/* <Route element={<PrivateRoute resourceRequested="tasklist" />}>
                <Route path="/tasklist" element={<TaskListPage />} />
              </Route> */}
              <Route path="/tasklist" element={<TaskListPage />} />
              {/* /post/* means that all paths starting with /post/ will be handled by PostPage. */}
              <Route path="/posts/*" element={<PostsPage />} />

              {/* This is 404 page, if no route match, this will be rendered */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Box>
        <Footer />
      </Suspense>
    </Flex>
  );
};

export default App;
