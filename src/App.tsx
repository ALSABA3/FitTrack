import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./Pages/Home";
import { LoginForm } from "./Pages/Login";
import { SignUpForm } from "./Pages/Signup";
import Shop from "@/Pages/Shop";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Profile from "./Pages/Profile";
import Meals from "./Pages/Meals";
import Workouts from "./Pages/Workouts";
import Library from "./Pages/Library";
import {observer} from "mobx-react-lite"; 
import { useContext, useEffect} from "react";
import { Context } from "./main";
import { Layout, LoggedLayout } from "./components/Layout";
import Blogs from "./Pages/Blogs";
import Blog from "./components/Blog";

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
      { path: "Workouts", element: <Workouts /> },
      { path: "Meals", element: <Meals /> },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      { path: "Shop", element: <Shop /> },
      { path: "Profile", element: <Profile /> },
      { path: "Blogs/:id", element: <Blog /> },
      { path: "Library", element: <Library/>},
      { path: "Dashboard", element: <Dashboard/>}
    ],
  },
]);

function App() {
  const {store} = useContext(Context);

  const checkAuth = async () =>{
    await store.checkAuth();
  }
  
  useEffect(  () => {
    if (localStorage.getItem('token')) {
      checkAuth();
        if(store.user.email !== undefined){
          store.setAuthStatus(true);
        }
    }     
  }, [store.isAuth]);

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {store.isAuth ? (
          <RouterProvider router={loggedRouter} />
        ) : (
          <RouterProvider router={router} />
        )}
      </ThemeProvider>
  );
}


export default observer(App);