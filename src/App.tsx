import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuth from "./components/useAuth";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import CartContextProvider from "@/components/shopping-cart.jsx";
import Home from "./Pages/Home";
import { LoginForm } from "./Pages/Login";
import { SignUpForm } from "./Pages/Signup";
import Shop from "@/Pages/Shop";

// import { ModeToggle } from "./components/mode-toggle";

function App() {
  const { isLoggedIn, accessToken, login, logout } = useAuth();
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CartContextProvider>
          <BrowserRouter>
            {isLoggedIn ? <Header logout={logout} /> : <Header />}
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/Login"
                element={<LoginForm login={login} />}
              ></Route>
              <Route path="/SignUp" element={<SignUpForm />}></Route>
              <Route path="/Shop" element={<Shop />}></Route>
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
