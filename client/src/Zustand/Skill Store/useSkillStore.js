import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const fallbackData = {
    "Languages": ["JavaScript", "TypeScript", "Python", "Java", "C", "C++"],
    "Tools": ["Git", "Docker", "Kubernetes", "AWS"],
    "Databases": ["MySQL", "MongoDB", "Redis", "PostgreSQL"],
    "FrameworksAndLibraries": ["React", "Node.js", "Express", "Next.js", "Redux", "Tailwind CSS", "Socket.io", "Shadcn UI"]
}
const useSkillStoreforPost = create(
    persist(
        (set) => ({
            isCreate: false,
            isLoading: false,
            handleCreate: async (data) => {
                set({ isLoading: true });
                try {
                    const response = await fetch("/api/user/skills/addSkills", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(data),
                    });
                    const responseData = await response.json();
                    if (response.ok) {
                        set({ isCreate: true });
                        toast.success("Skills created successfully");
                    } else {
                        toast.error(responseData.message || "Error creating skills");

                    }
                } catch (error) {
                    toast.error("Error creating skills");
                } finally {
                    set({ isLoading: false });
                }
            },
            handleUpdate: async (data) => {
                set({ isLoading: true });
                try {
                    const response = await fetch("/api/user/updateSkills", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(data),
                    });
                    const responseData = await response.json();
                    if (response.ok) {
                        toast.success("Skills updated successfully");
                    } else {
                        toast.error(responseData.message || "Error updating skills");
                    }
                } catch (error) {
                    toast.error("Error updating skills");
                } finally {
                    set({ isLoading: false });
                }
            },
            handleDelete: async () => {
                set({ isLoading: true });
                try {
                    const response = await fetch(`/api/user/deleteSkills`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    if (response.ok) {
                        set({ isCreate: false });
                        toast.success("Skills deleted successfully");
                    } else {
                        toast.error("Error deleting skills");
                    }
                } catch (error) {
                    toast.error("Error deleting skills");
                } finally {
                    set({ isLoading: false });
                }
            },

        }),

        {
            name: "skills-storage", // Key in local storage
        }
    )
)
const useSkillStore = create((set) => ({
    data: null,
    loading: true,
    source: "unknown", // State to identify the source of data
  
    fetchSkillData: async (username = null) => {
      set({ loading: true });
      try {
        // Determine API endpoint based on whether username is provided
        const apiEndpoint = username
          ? `/api/user/getSkillForPortfolio/${username}`
          : `/api/user/getSkills`;
  
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
            set({ data: responseData.data, loading: false, source: username ? "portfolio" : "skill" });
          } else {
            set({ data: fallbackData, loading: false, source: "fallback" });
          }
        } else {
          set({ data: fallbackData, loading: false, source: "fallback" });
        }
      } catch (error) {
        console.error("Error fetching skill data:", error);
        set({ data: fallbackData, loading: false, source: "fallback" });
      }
    },
  }));
  
export { useSkillStoreforPost,useSkillStore};