import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const fallbackData = [
    {
      projectImage: "https://via.placeholder.com/300x300",
      title: "E-commerce Website",
      description: "An e-commerce platform with user authentication, product listings, and shopping cart functionality.",
      techstack: ["React", "Node.js", "MongoDB", "Express"],
      githubRepo: "https://github.com/johndoe/ecommerce-website",
      liveLink: "https://ecommerce-site.com"
    },
    {
      projectImage: "https://via.placeholder.com/300x300",
      title: "Portfolio Website",
      description: "A personal portfolio to showcase projects, blog posts, and contact information.",
      techstack: ["Next.js", "Tailwind CSS", "Vercel"],
      githubRepo: "https://github.com/janesmith/portfolio",
      liveLink: "https://janesmith.dev"
    },
    {
      projectImage: "https://via.placeholder.com/300x300",
      title: "Task Management Tool",
      description: "A productivity app for managing daily tasks and tracking project progress.",
      techstack: ["Vue", "Firebase", "Vuetify"],
      githubRepo: "https://github.com/alicejones/task-manager",
      liveLink: "https://taskmanager.com"
    }
  ];
  
const useProjectStoreforPost = create(
    persist(
        (set) => ({
            isCreate: false,
            isCreateLoading: false,
            isUpdateLoading: false,
            isDeleteLoading: false,

            handleCreate: async (data, file) => {
               

                const submissionData = new FormData();
                submissionData.append('title', data.title);
                submissionData.append('description', data.description);
                submissionData.append('githubRepo', data.githubRepo);
                submissionData.append('liveLink', data.liveLink);
                data.techstack.forEach((tech) => {
                    submissionData.append('techstack', tech);
                });
                submissionData.append('projectImage', file);

                set({ isCreateLoading: true });
                try {
                    const response = await fetch("/api/user/projects/addProjects", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: submissionData,
                    });

                    const result = await response.json();
                    if (response.ok) {
                        toast.success("Project added successfully!");
                    } else {
                        console.log(`Error adding project: ${JSON.stringify(result)}`);
                        toast.error(result.message);
                    }
                } catch (error) {
                    console.error("Error adding project:", error);
                    toast.error("An error occurred while adding the project.");
                } finally {
                    set({ isCreateLoading: false });
                }
            },
            handleUpdate: async (data, file,projectId) => {
                
                const submissionData = new FormData();
                submissionData.append('_id', projectId);
                submissionData.append('title', data.title);
                submissionData.append('description', data.description);
                submissionData.append('githubRepo', data.githubRepo);
                submissionData.append('liveLink', data.liveLink);
                submissionData.append('techstack', JSON.stringify(data.techstack));
                submissionData.append('projectImage', file);

                set({ isUpdateLoading: true });
                try {
                    const response = await fetch("/api/user/updateProject", {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: submissionData,
                    });

                    const result = await response.json();
                    if (response.ok) {
                        toast.success("Project updated successfully!");
                    } else {
                        toast.error("Failed to update project.");
                    }
                } catch (error) {
                    console.log(`Error updating project: ${result}`);
                    
                    console.error("Error updating project:", error);
                    toast.error("An error occurred while updating the project.");
                } finally {
                    set({ isUpdateLoading: false });
                }
            },

            
            handleDelete: async (data) => {
                set({ isDeleteLoading: true });
                try {
                    const response = await fetch("/api/user/deleteProject", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(data),
                    });
                    if (response.ok) {
                        set({ isCreate: false });
                        toast.success("Project deleted successfully");
                    } else {
                        toast.error(result.message);
                    }
                } catch (error) {
                    toast.error("Error deleting project");
                } finally {
                    set({ isDeleteLoading: false });
                }
            },
        }),
        {
            name: "project-storage", // Key in local storage
            partialize: (state) => ({
                isCreate: state.isCreate,
                isCreateLoading: state.isCreateLoading,
                isUpdateLoading: state.isUpdateLoading,
                isDeleteLoading: state.isDeleteLoading,
            }), // Persist only these properties, excluding formData and file
        }
    )
);
const useProjectStore = create((set) => ({
    data: null,
    loading: true,
    source: "unknown",
    idProject: [],
  
    fetchProjectData: async (username = null) => {
      set({ loading: true });
      try {
        // Determine API endpoint based on whether username is provided
        const apiEndpoint = username
          ? `/api/user/getProjectsForPortfolio/${username}`
          : `/api/user/projects/getProjects`;
  
        // Set up headers conditionally based on the endpoint
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
  
        if (!username) {
          headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        }
  
        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers,
        });
  
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            const projects = responseData.data;

            // Extract _id and idProject for each item
            const idProject = projects.map(item => ({
              _id: item._id,
              title: item.title
            }));
            set({ data: responseData.data, loading: false, source: username ? "portfolio" : "project" ,idProject});
          } else {
            set({ data: fallbackData, loading: false, source: "fallback" });
          }
        } else {
          set({ data: fallbackData, loading: false, source: "fallback" });
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        set({ data: fallbackData, loading: false, source: "fallback" });
      }
    },
}));
export { useProjectStoreforPost,useProjectStore };
