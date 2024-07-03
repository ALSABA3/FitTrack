import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuth from "./components/useAuth";
import { ThemeProvider } from "@/components/theme-provider";
import LoggedNav from "@/components/LoggedNav";
import CartContextProvider from "@/components/shopping-cart.jsx";
import Home from "./Pages/Home";
import { LoginForm } from "./Pages/Login";
import { SignUpForm } from "./Pages/Signup";
import Shop from "@/Pages/Shop";
import Nav from "./components/Nav";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Profile from "./Pages/Profile";
import Meals from "./Pages/Meals";
import Workouts from "./Pages/Workouts";
import Library from "./Pages/Library";
import {observer} from "mobx-react-lite"; 
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";

// import { ModeToggle } from "./components/mode-toggle";

function App() {
  const {store} = useContext(Context);
  
  const { isLoggedIn, accessToken, login, logout } = useAuth();

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

  console.log(store.isAuth)

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CartContextProvider>
          <BrowserRouter>
            {store.isAuth ? <LoggedNav logout={logout} /> : <Nav />}
            
            <Routes>
              <Route
                path="/"
                element={store.isAuth ? <Dashboard /> : <Home />} 
              ></Route>
              <Route
                path="/Login"
                element={
                  store.isAuth ? <Dashboard /> : <LoginForm login={login} />
                }
              ></Route>
              <Route
                path="/SignUp"
                element={store.isAuth ? <Dashboard /> : <SignUpForm />}
              ></Route>
              <Route
                path="/Shop"
                element={store.isAuth ? <Shop /> : <Error />} 
              ></Route> 
              <Route
                path="/Profile"
                element={store.isAuth ? <Profile /> : <Error />}
              ></Route>
              <Route
                path="/Meals"
                element={store.isAuth ? <Meals /> : <Error />}
              ></Route>
              <Route
                path="/WorkOut"
                element={store.isAuth ? <Workouts /> : <Error />}
              ></Route>
              <Route
                path="/Library"
                element= {<Library/>}
              ></Route>
              
              <Route
                path="/Dashboard"
                element={
                  store.isAuth  ? <Dashboard /> : <Error />}
              ></Route>

              
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ThemeProvider>
    </>
  );
}


export default observer(App);