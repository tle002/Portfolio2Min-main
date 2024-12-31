import { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useSkillStoreforPost } from '../../../Zustand/Skill Store/useSkillStore';

export default function UserSkills() {
  const {isCreate, isLoading, handleCreate, handleDelete,handleUpdate} = useSkillStoreforPost()
  const [formData, setFormData] = useState({
    Languages: [],
    Tools: [],
    Databases: [],
    FrameworksAndLibraries: [],
  });
  const [skillCategory, setSkillCategory] = useState('');
  const [skill, setSkill] = useState('');

  const handleCategoryChange = (e) => {
    setSkillCategory(e.target.value);
    setSkill(''); // Reset skill input when category changes
  };

  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };

  const addSkill = () => {
    if (skill && skillCategory) {
      setFormData((prev) => ({
        ...prev,
        [skillCategory]: [...prev[skillCategory], skill],
      }));
      setSkill(''); // Clear skill input after adding
    }
  };

 

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-x">
              Unleash Your Expertise
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Define and showcase your proficiency across Languages, Tools, Databases, and Frameworks & Libraries.
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Skills Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              {/* Dropdown for Skill Category */}
              <div className="space-y-2">
                <Label htmlFor="skillCategory" className="text-gray-300">Select Skill Category</Label>
                <select 
                  id="skillCategory" 
                  name="skillCategory" 
                  value={skillCategory} 
                  onChange={handleCategoryChange}
                  required 
                  className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a category</option>
                  <option value="Languages">Languages</option>
                  <option value="Tools">Tools</option>
                  <option value="Databases">Databases</option>
                  <option value="FrameworksAndLibraries">Frameworks & Libraries</option>
                </select>
              </div>
              
              {/* Skills Input */}
              {skillCategory && (
                <div className="space-y-2">
                  <Label htmlFor="skill" className="text-gray-300">Add a Skill</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="skill" 
                      name="skill" 
                      placeholder={`Enter your ${skillCategory} skill`} 
                      value={skill} 
                      onChange={handleSkillChange} 
                      required
                      className="flex-grow bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button 
                      type="button" 
                      onClick={addSkill} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Display Added Skills */}
              {Object.keys(formData).map((category) =>
                Array.isArray(formData[category]) && formData[category].length > 0 ? (
                  <div key={category} className="space-y-2">
                    <Label className="text-gray-300">{category}</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData[category].map((skill, index) => (
                        <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm text-gray-100 border border-gray-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 mt-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            
            onClick={()=>handleCreate(formData)}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white" 
            disabled={!isCreate} 
            onClick={()=>handleUpdate(formData)}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white" 
            disabled={!isCreate} 
            onClick={handleDelete}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
