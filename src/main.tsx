import React from "react";
import ReactDOM from "react-dom/client";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";
import store from "./components/Store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <GoogleOAuthProvider clientId="889087166120-nkb3ue3qhb820r205g3dhf7cdhj949tl.apps.googleusercontent.com">
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  // </GoogleOAuthProvider>
);
