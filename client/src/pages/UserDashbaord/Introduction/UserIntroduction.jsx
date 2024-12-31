import {useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { useUserIntroStoreForPost } from '../../../Zustand/Intro Store/useIntroductionStore';


export default function UserIntroduction() {
  const { formData, isCreateLoading, isUpdateLoading,isDeleteLoading, isCreate, handleCreate, handleDelete, handleUpdate } = useUserIntroStoreForPost();
  const [introData, setIntroData] = useState({
    ...formData,
    socialLinks: formData.socialLinks || {}, // Default to an empty object if undefined
  });
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setIntroData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };


  const handleStatusChange = (value) => {
    setIntroData((prev) => ({ ...prev, status: value }));
  };


  return (
    <div className="w-full flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-x">
              Craft Your Professional Profile
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Share your story, showcase your potential
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Introduction Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={introData?.fullName || ''}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-300">Status</Label>
                <Select onValueChange={handleStatusChange} value={introData?.status || ''}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Hire Me!" className="hover:bg-gray-700 text-green-400">Hire Me!</SelectItem>
                    <SelectItem value="Open to Opportunity" className="hover:bg-gray-700 text-green-400">Open to Opportunity</SelectItem>
                    <SelectItem value="#openToWork" className="hover:bg-gray-700 text-green-400">#OpenToWork</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Full Stack Developer"
                value={introData?.title || ''}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-300">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Noida,Up,India"
                value={introData?.location || ''}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Social Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Gmail"
                  name="gmail"
                  value={introData?.socialLinks.gmail || ''}
                  onChange={handleSocialChange}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input
                  placeholder="Phone"
                  name="phone"
                  value={introData?.socialLinks.phone || ''}
                  onChange={handleSocialChange}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input
                  placeholder="GitHub"
                  name="github"
                  value={introData?.socialLinks.github || ''}
                  onChange={handleSocialChange}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input
                  placeholder="LinkedIn"
                  name="linkedin"
                  value={introData?.socialLinks.linkedin || ''}
                  onChange={handleSocialChange}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input
                  placeholder="Twitter"
                  name="twitter"
                  value={introData?.socialLinks.twitter || ''}
                  onChange={handleSocialChange}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-300">Upload Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about" className="text-gray-300">About</Label>
              <Textarea
                id="about"
                name="about"
                placeholder="Tell us about yourself"
                value={introData?.about || ''}
                onChange={handleChange}
                rows={4}
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 mt-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            
            onClick={() => handleCreate(introData,file)}
          >
            {isCreateLoading ? 'Creating...' : 'Create'}
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => handleUpdate(introData,file)}
          >
            {isUpdateLoading ? 'Updating...' : 'Update'}
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
          >
            {isDeleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
