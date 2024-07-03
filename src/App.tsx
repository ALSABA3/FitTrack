import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useAppSelector } from "./components/Store/hooks";
import Home from "@/components/Pages/Home";
import LoginForm from "@/components/Pages/Login";
import SignUpForm from "@/components/Pages/Signup";
import Shop from "@/components/Pages/Shop";
import Dashboard from "@/components/Pages/Dashboard";
import Error from "@/components/Pages/Error";
import Profile from "@/components/Pages/Profile";
import Meals from "@/components/Pages/Meals";
import WorkOut from "@/components/Pages/WorkOut";
import { Layout, LoggedLayout } from "./components/Layout";
import Blogs from "@/components/Pages/Blogs";
import Blog from "@/components/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "Login", element: <LoginForm /> },
      { path: "SignUp", element: <SignUpForm /> },
    ],
  },
]);

const loggedRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoggedLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "WorkOut", element: <WorkOut /> },
      { path: "Meals", element: <Meals /> },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      { path: "Shop", element: <Shop /> },
      { path: "Profile", element: <Profile /> },
      { path: "Blogs/:id", element: <Blog /> },
    ],
  },
]);

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {isLoggedIn ? (
          <RouterProvider router={loggedRouter} />
        ) : (
          <RouterProvider router={router} />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
