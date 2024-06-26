import React, {createContext} from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Store from "./store/store";
import App from "./App";
import "./index.css";

interface State{
  store: Store,
}

export const store = new Store();

export const Context = createContext<State>({store});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="889087166120-nkb3ue3qhb820r205g3dhf7cdhj949tl.apps.googleusercontent.com">
    <React.StrictMode>
      <Context.Provider value={{store}}>
        <App />
      </Context.Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
