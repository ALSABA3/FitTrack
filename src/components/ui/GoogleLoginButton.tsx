// GoogleLoginButton.tsx
import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton: React.FC = () => {
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;

      try {
        const res = await axios.post("http://localhost:5000/api/auth/google", {
          token,
        });
        console.log(res.data);
        // Handle successful response (e.g., store tokens, redirect, etc.)
      } catch (error) {
        console.error("Error logging in with Google", error);
        // Handle error response
      }
    } else {
      console.error("No credential returned from Google");
    }
  };

  const handleError = (error: any) => {
    console.error("Google Login Failed", error);
    // Handle login failure
  };

  return (
    <GoogleOAuthProvider clientId="889087166120-nkb3ue3qhb820r205g3dhf7cdhj949tl.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
