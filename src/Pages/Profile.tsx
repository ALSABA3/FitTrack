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
import { useContext, useState } from "react";
import axios from "axios";
import GoogleLoginButton from "./../components/ui/GoogleLoginButton";
import AuthService from "@/services/AuthService";
import { Context } from "@/main";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import React from "react";

interface  GenderName{
  gender: string;
}

interface ArrayObjectSelectGenderName {
  selectedGenderName: GenderName | null;
}

const GenderNames: GenderName[] = [
  {
    gender: "Male",
  },
  {
    gender: "Female"
  }
];


const Profile = () => {
  const {store} = useContext(Context); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileName: "",
    dateofbirth: "",
    height: 0,
    weight: 0
  });

  const [genderName, setGenderName] = React.useState<ArrayObjectSelectGenderName>({
    selectedGenderName: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };
  const updateProfile = async () =>{
    try{
      const user = await store.updateProfile({
        ...formData,
        gender: genderName.selectedGenderName?.gender
      });

      if(user){
        navigate('/DashBoard');
      }
    }

    catch(e){
      console.log(e);
    }
  }

  return (
    <div className="container h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Profile</CardTitle>
          <CardDescription>
            Enter your information to create a profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="profileName">Profile name</Label>
                <Input
                  id="profileName"
                  name="profileName"
                  value={formData.profileName}
                  onChange={handleChange}
                  placeholder="Boda"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={genderName.selectedGenderName}
                  onChange={(option: GenderName | null) => {
                    setGenderName({ selectedGenderName: option });
                  }}
                  getOptionLabel={(gender: GenderName) => gender.gender}
                  getOptionValue={(gender: GenderName) => gender.gender}
                  options={GenderNames}
                  isClearable={true}
                  backspaceRemovesValue={true}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">Height(cm)</Label>
              <Input
                id="height"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="180"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Weight(kg)</Label>
              <Input
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="75"
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Date of Birth</Label>
              <Input
                id="dateofbirth"
                name="dateofbirth"
                value={formData.dateofbirth}
                onChange={handleChange}
                type="date"
              />
            </div>
            <Button type="submit" className="w-full" onClick = {updateProfile}>
              Create a Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
