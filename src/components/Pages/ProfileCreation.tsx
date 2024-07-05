import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface UserProfile {
  firstName: string;
  lastName: string;
  gender: string;
  height: number;
  weight: number;
  dateOfBirth: string;
}

const ProfileCreation = () => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    gender: "",
    height: 0,
    weight: 0,
    dateOfBirth: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const handleGenderChange = (value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      gender: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.post(
        "http://localhost:4000/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data?.message);
      alert("Profile created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="container h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Profile</CardTitle>
          <CardDescription>
            Enter your information to save your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile ? (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="profileName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    placeholder="Boda"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    placeholder="Alsabaa"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  defaultValue={profile.gender}
                  name="gender"
                  onValueChange={handleGenderChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="height">Height(cm)</Label>
                <Input
                  id="height"
                  type="number"
                  name="height"
                  value={profile.height}
                  onChange={handleChange}
                  placeholder="180"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight(kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  name="weight"
                  value={profile.weight}
                  onChange={handleChange}
                  placeholder="75"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Save Profile
              </Button>
            </form>
          ) : (
            <div>Profile not found</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCreation;
