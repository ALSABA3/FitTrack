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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface UserProfile {
  firstName: string;
  lastName: string;
  gender: string;
  height: number;
  weight: number;
  dateofbirth: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    gender: "",
    height: 0,
    weight: 0,
    dateofbirth: "", // Ensure the initial value is an empty string
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the existing profile data from the server when the component mounts
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get("http://localhost:4000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        // Extract only the date part from the ISO string
        if (data.dateofbirth) {
          data.dateofbirth = data.dateofbirth.split("T")[0];
        }
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    console.log(name, value); // Added for debugging
  };

  const handleGenderChange = (value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      gender: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(profile);
    try {
      const token = Cookies.get("accessToken");
      await axios.put("http://localhost:4000/profile/", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                <Label htmlFor="dateofbirth">Date of Birth</Label>
                <Input
                  id="dateofbirth" // Ensure the id matches here
                  type="date"
                  name="dateofbirth" // Ensure the name matches here
                  value={profile.dateofbirth}
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

export default Profile;
