import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { Loader } from "lucide-react";
import { useProjectStoreforPost } from "../../../Zustand/Project Store/useProjectStore";
import { useProjectStore } from "../../../Zustand/Project Store/useProjectStore";
import { toast } from "sonner";

export default function UserProjects() {
  const { isCreateLoading, isUpdateLoading, isDeleteLoading, handleCreate, handleUpdate, handleDelete } = useProjectStoreforPost();
  const { idProject, fetchProjectData } = useProjectStore();
  const lengthOfProjectId = idProject ? idProject.length : 0;
  
  
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techstack: [],
    githubRepo: '',
    liveLink: '',
    projectImage: '',
  });
  const [tech, setTech] = useState('');
  const [file, setFile] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [projectId, setProjectId] = useState('');
  
  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (e) => {
    setTech(e.target.value);
  };

  const addTech = () => {
    if (tech) {
      setFormData((prev) => ({
        ...prev,
        techstack: Array.isArray(prev.techstack) ? [...prev.techstack, tech] : [tech],
      }));
      setTech('');
    }
  };
  

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleCreateClick = async () => {
    try {
      await handleCreate(formData, file);
      setFormData({
        title: '',
        description: '',
        techstack: [],
        githubRepo: '',
        liveLink: '',
        projectImage: '',
      });
    } catch (error) {
      toast.error("Error creating project");
      console.error('Create failed:', error);
    }
  };

  const handleUpdateClick = async () => {
    // console.log(`Project ID: ${projectId}`);
    
    if (isUpdateMode && projectId) {
      try {
        await handleUpdate(formData,file,projectId);
        setIsUpdateMode(false);
        setProjectId(''); // Reset projectId after update
        setFormData({
          title: '',
          description: '',
          techstack: [],
          githubRepo: '',
          liveLink: '',
          projectImage: '',
        });
        // window.location.reload();
      } catch (error) {
        toast.error("Error updating project");
        console.error('Update failed:', error);
      }
    } else {
      setIsUpdateMode(true);
      setIsDeleteMode(false);
    }
  };
  const handleDeleteClick = async () => {
    if (isDeleteMode && projectId) {
      try {
        await handleDelete({ _id: projectId });
        setIsDeleteMode(false);
        setProjectId('');
        window.location.reload();
      } catch (error) {
        toast.error("Error deleting project");
        console.error('Delete failed:', error);
      }
    } else {
      setIsDeleteMode(true);
      setIsUpdateMode(false);
      setFormData({
        title: '',
        description: '',
        techstack: [],
        githubRepo: '',
        liveLink: '',
        projectImage: '',
      });
    }
  };

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    // console.log(`Selected ID: ${selectedId}`);
    
    setProjectId(selectedId);
  
    if (isUpdateMode && selectedId && idProject) {
      const selectedProject = idProject.find(item => item?._id === selectedId);
      if (selectedProject) {
        setFormData({
          
          title: selectedProject.title,
          description: selectedProject.description,
          techstack: selectedProject.techstack,
          githubRepo: selectedProject.githubRepo,
          liveLink: selectedProject.liveLink,
          projectImage: selectedProject.projectImage,
        });
      } else {
        console.error("Project with selected ID not found.");
        setFormData({
          title: '',
          description: '',
          techstack: [],
          githubRepo: '',
          liveLink: '',
          projectImage: '',
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
              Showcase Your Projects
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Highlight your technical achievements and share your projects with the world.
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Project Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {(isUpdateMode || isDeleteMode) && lengthOfProjectId > 0 && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="projectDropdown" className="text-gray-300">
                  Select Project to {isUpdateMode ? 'Update' : 'Delete'}
                </Label>
                {idProject && idProject.length > 0 && (
                  <select
                    id="projectDropdown"
                    value={projectId}
                    onChange={handleDropdownChange}
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                  >
                    <option value="">Select a Project </option>
                    {idProject.map((item) => (
                      <option key={item._id} value={item._id}>
                        {`${item?.title}`}
                      </option>
                    ))}
                  </select>
                )}

              </div>
            )}

            {(!isDeleteMode) && (!isUpdateMode || (isUpdateMode && projectId)) && (
              <div className="mt-2">
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Project title"
                      required
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      required
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="techstack" className="text-gray-300">Tech Stack</Label>
                    <div className="flex gap-2">
                      <Input
                        id="techstack"
                        placeholder="e.g., React, Node.js"
                        value={tech}
                        onChange={handleTechChange}
                        className="bg-gray-700 border-gray-600 text-gray-100 flex-grow focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Button
                        type="button"
                        onClick={addTech}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  {formData?.techstack?.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-gray-300">Added Tech Stack</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.techstack.map((item, index) => (
                          <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm text-gray-100 border border-gray-600">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="projectImage" className="text-gray-300">Project Image</Label>
                    <Input
                      type="file"
                      id="projectImage"
                      onChange={handleFileChange}
                      className="bg-gray-700 border-gray-600 text-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubRepo" className="text-gray-300">GitHub Repository</Label>
                    <Input
                      id="githubRepo"
                      name="githubRepo"
                      type="url"
                      placeholder="https://github.com/username/repository"
                      value={formData.githubRepo}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="liveLink" className="text-gray-300">Live Link</Label>
                    <Input
                      id="liveLink"
                      name="liveLink"
                      type="url"
                      placeholder="https://project-live-link.com"
                      value={formData.liveLink}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 mt-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreateClick}>
            {isCreateLoading ? 'Creating...' : 'Create'}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleUpdateClick}>
            {isUpdateLoading ? 'Updating...' : isUpdateMode ? 'Confirm Update' : 'Update'}
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteClick}>
            {isDeleteLoading ? 'Deleting...' : isDeleteMode ? 'Confirm Delete' : 'Delete'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
