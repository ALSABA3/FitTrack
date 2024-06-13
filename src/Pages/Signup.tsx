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
import GoogleLoginButton from "./../components/ui/GoogleLoginButton";

export function SignUpForm() {
  const [formData, setFormData] = useState({
    first_Name: "",
    last_Name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register", formData);
      console.log("Signup successful!");
    } catch (error: any) {
      console.error(
        "Error:",
        error.response?.data?.error || "An error occurred"
      );
    }
  };

  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

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
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Boda@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
              />
            </div>
            <Button type="submit" className="w-full" onSubmit={handleSubmit}>
              Create an account
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with Google
            </Button> */}
            <GoogleLoginButton />
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
}
