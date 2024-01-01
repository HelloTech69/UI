import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import PublicRoute from "~shared/PublicRoute";
import useAuthStore from "~shared/store/AuthStore";

import { useAuth } from "~features/auth";

// Private Component
const DashboardPage = lazy(() => import("~features/pages/dashboard/Dashboard"));

// Public Component
const LandingPage = lazy(() => import("~features/pages/landing/Landing"));
const LoginPage = lazy(() => import("~features/pages/login/Login"));
const RegisterPage = lazy(() => import("~features/pages/register/Register"));

// Shared Component
const Sidebar = lazy(() => import("~shared/components/sidebar/Sidebar"));
const Navbar = lazy(() => import("~shared/components/navbar/Navbar"));
const Footer = lazy(() => import("~shared/components/footer/Footer"));

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth-storage" && !event.newValue) {
        useAuthStore.setState({
          isAuthenticated: false,
          user: null,
          role: null,
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Suspense fallback={"Loading"}>
        {isAuthenticated ? (
          <Sidebar
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
        ) : null}
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <Sidebar onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Navbar onOpen={onOpen} />
        <Box flex="1" ml={isAuthenticated ? { base: 0, md: 60 } : 0} py="4">
          <Routes>
            {/* This is public route, later can add check to redirect authenticated user back to dashboard */}
            Can move this Route and public route checking
            <Route element={<PublicRoute strict={true} />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
            </Route>
            {/* This is private route, only authenticated user can access this route */}
            {/* /dashboard/* means that all paths starting with /dashboard/ will be handled by DashboardPage. */}
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Box>
        <Footer />
      </Suspense>
    </Flex>
  );
};

export default App;
