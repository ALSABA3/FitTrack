import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Store/hooks";
import { authActions } from "../Store/auth-slice";
// import GoogleLoginButton from "./../components/ui/GoogleLoginButton";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/user/signup", {
        userEmail: email,
        userPassword: password,
      });

      console.log("Signup successful!");

      try {
        const response = await axios.post("http://localhost:5000/login", {
          userEmail: email,
          userPassword: password,
        });
        if (response.data.message === "logged in") {
          dispatch(authActions.login(response.data.accessToken));
          navigate("/Profile");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        return;
      }
    } catch (signupError: any) {
      console.error(
        "Signup error:",
        signupError.response?.data?.error || "An error occurred during signup"
      );
      return;
    }
  };

  // const responseMessage = (response: any) => {
  //   console.log(response);
  // };
  // const errorMessage = (error: any) => {
  //   console.log(error);
  // };

  return (
    <div className="container h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="first_Name"
                  value={formData.first_Name}
                  onChange={handleChange}
                  placeholder="Boda"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="last_Name"
                  value={formData.last_Name}
                  onChange={handleChange}
                  placeholder="Alsabaa"
                  required
                />
              </div>
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Boda@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create an account
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with Google
            </Button> */}
            {/* <GoogleLoginButton /> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/Login" className="underline">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
