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
import WorkOut from "./Pages/WorkOut";
import Library from "./Pages/Library";

// import { ModeToggle } from "./components/mode-toggle";

function App() {
  const { isLoggedIn, accessToken, login, logout } = useAuth();
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CartContextProvider>
          <BrowserRouter>
            {isLoggedIn ? <LoggedNav logout={logout} /> : <Nav />}
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Dashboard /> : <Home />}
              ></Route>
              <Route
                path="/Login"
                element={
                  isLoggedIn ? <Dashboard /> : <LoginForm login={login} />
                }
              ></Route>
              <Route
                path="/SignUp"
                element={isLoggedIn ? <Dashboard /> : <SignUpForm />}
              ></Route>
              <Route
                path="/Shop"
                element={isLoggedIn ? <Shop /> : <Shop />} // /Error
              ></Route> 
              <Route
                path="/Profile"
                element={isLoggedIn ? <Profile /> : <Error />}
              ></Route>
              <Route
                path="/Meals"
                element={isLoggedIn ? <Meals /> : <Error />}
              ></Route>
              <Route
                path="/WorkOut"
                element={isLoggedIn ? <WorkOut /> : <Error />}
              ></Route>
              <Route
                path="/Library"
                element= {<Library/>}
              ></Route>
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
