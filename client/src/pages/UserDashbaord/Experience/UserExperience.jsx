import { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { useExperienceStoreforPost } from '../../../Zustand/Expreince Store/useExperienceStore';
import { useExperienceStore } from '../../../Zustand/Expreince Store/useExperienceStore';

export default function UserExperience() {
  const { isCreate, handleCreate, handleDelete, handleUpdate } = useExperienceStoreforPost();
  const { idAndCompanyRole, fetchExpData, loading } = useExperienceStore();
  
  const [formData, setFormData] = useState({
    companyAndRole: '', 
    duration: '',       
    responsibilities: [], // Changed to an array to manage multiple responsibilities
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  
  // Responsibility management
  const [responsibility, setResponsibility] = useState('');

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchExpData();
  }, [fetchExpData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addResponsibility = () => {
    if (responsibility.trim()) {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibility],
      }));
      setResponsibility('');
    }
  };

  const handleCreateClick = async () => {
    setIsCreating(true);
    try {
      await handleCreate(formData);
      setFormData({ companyAndRole: '', duration: '', responsibilities: [] });
    } catch (error) {
      console.error('Create failed:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateClick = async () => {
    if (isUpdateMode && selectedCompanyId) {
      setIsUpdating(true);
      try {
        await handleUpdate({ ...formData, _id: selectedCompanyId });
        setIsUpdateMode(false);
        setSelectedCompanyId('');
        setFormData({ companyAndRole: '', duration: '', responsibilities: [] });
        window.location.reload();
      } catch (error) {
        console.error('Update failed:', error);
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsUpdateMode(true);
      setIsDeleteMode(false);
    }
  };

  const handleDeleteClick = async () => {
    if (isDeleteMode && selectedCompanyId) {
      setIsDeleting(true);
      try {
        await handleDelete({ _id: selectedCompanyId });
        setIsDeleteMode(false);
        setSelectedCompanyId('');
        window.location.reload();
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setIsDeleting(false);
      }
    } else {
      setIsDeleteMode(true);
      setIsUpdateMode(false);
      setFormData({ companyAndRole: '', duration: '', responsibilities: [] });
    }
  };

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCompanyId(selectedId);
    
    if (isUpdateMode && selectedId) {
      const selectedExperience = idAndCompanyRole.find(item => item._id === selectedId);
      if (selectedExperience) {
        setFormData({
          companyAndRole: selectedExperience.companyAndRole,
          duration: selectedExperience.duration,
          responsibilities: selectedExperience.responsibilities || []
        });
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600 animate-gradient-x">
              Elevate Your Experience
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Showcase experiences to impress and inspire your professional journey.
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Experience Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {(isUpdateMode || isDeleteMode) && !loading && idAndCompanyRole.length > 0 && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="companyRoleDropdown" className="text-gray-300">
                  Select Experience to {isUpdateMode ? 'Update' : 'Delete'}
                </Label>
                <select
                  id="companyRoleDropdown"
                  value={selectedCompanyId}
                  onChange={handleDropdownChange}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                >
                  <option value="">Select an ID</option>
                  {idAndCompanyRole.map((item) => (
                    <option key={item._id} value={item._id}>
                      {`${item.companyAndRole} - ${item._id}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {(!isDeleteMode) && (!isUpdateMode || (isUpdateMode && selectedCompanyId)) && (
              <div className="mt-2">
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyAndRole" className="text-gray-300">Company & Role</Label>
                    <Input
                      id="companyAndRole"
                      name="companyAndRole"
                      value={formData.companyAndRole}
                      onChange={handleChange}
                      placeholder="e.g., Excellence Technologies@Full-Stack Developer"
                      required
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-gray-300">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 2 years"
                      required
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsibilities" className="text-gray-300">Add Responsibility</Label>
                    <div className="flex gap-2">
                      <Input
                        id="responsibility"
                        placeholder="Enter a responsibility"
                        value={responsibility}
                        onChange={(e) => setResponsibility(e.target.value)}
                        className="flex-grow bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Button type="button" onClick={addResponsibility} className="bg-blue-500 hover:bg-blue-600 text-white">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.responsibilities.map((res, index) => (
                        <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm text-gray-100 border border-gray-600">
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 mt-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleCreateClick}
          >
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white" 
            onClick={handleUpdateClick}
          >
            {isUpdating ? 'Updating...' : isUpdateMode ? 'Confirm Update' : 'Update'}
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white" 
            onClick={handleDeleteClick}
          >
            {isDeleting ? 'Deleting...' : isDeleteMode ? 'Confirm Delete' : 'Delete'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
