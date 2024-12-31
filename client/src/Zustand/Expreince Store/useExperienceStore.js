import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const fallbackData = [
    {
        "companyAndRole": "Excellence Technologies@Full-Stack Developer",
        "duration": "2 years",
        "responsibilities": [
            "Built RESTful APIs and integrated them with front-end applications.",
            "Optimized performance and scalability.",
            "Worked with a team of developers to develop reusable and maintainable code.",]
        
    },
    {
        "companyAndRole": "Tech Innovators@Software Engineer",
        "duration": "1.5 years",
        "responsibilities": [
            "Contributed to the development of web applications using React and Node.js.",
            "Implemented responsive design and cross-browser compatibility.",
            "Collaborated with cross-functional teams to deliver high-quality software solutions.",]
    }
];

const useExperienceStoreforPost = create(
    persist(
        (set) => ({
            isCreate: false,
            isLoading: false,
            handleCreate: async (data) => {
                set({ isLoading: true });
                try {
                    const response = await fetch("/api/user/createExp", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(data),
                    });
                    const responseData = await response.json();
                    if (response.ok) {
                        set({isCreate: true });
                        toast.success("Experience created successfully");
                        window.location.reload();
                    } else {
                        toast.error(responseData.message || "Error creating experience");

                    }
                } catch (error) {
                    toast.error("Error creating experience");
                } finally {
                    set({ isLoading: false });
                }
            },
            handleUpdate: async (data) => {
                set({ isLoading: true });
                try {
                    const response = await fetch("/api/user/updateExp", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(data),
                    });
                    const responseData = await response.json();
                    if (response.ok) {
                        toast.success("Experience updated successfully");
                        
                    } else {
                        toast.error(responseData.message || "Error updating experience");
                    }
                } catch (error) {
                    toast.error("Error updating experience");
                } finally {
                    set({ isLoading: false });
                }
            },
            handleDelete: async (data) => {
                set({ isLoading: true });
                try {
                    const response = await fetch(`/api/user/deleteExp`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(data),
                    });
                    if (response.ok) {
                        set({ isCreate: false });
                        toast.success("Experience deleted successfully");
                    } else {
                        toast.error("Error deleting experience");
                    }
                } catch (error) {
                    toast.error("Error deleting experience");
                } finally {
                    set({ isLoading: false });
                }
            },

        }),

        {
            name: "experience-storage", // Key in local storage
        }
    )
)
const useExperienceStore = create((set) => ({
    data: null,
    loading: true,
    source: "unknown",
    idAndCompanyRole: [],
  
    fetchExpData: async (username = null) => {
      set({ loading: true });
      try {
        // Determine API endpoint based on whether username is provided
        const apiEndpoint = username
          ? `/api/user/getExpForPortfolio/${username}`
          : `/api/user/getExp`;
  
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
            const experiences = responseData.data;

            // Extract _id and companyAndRole for each item
            const idAndCompanyRole = experiences.map(item => ({
              _id: item._id,
              companyAndRole: item.companyAndRole
            }));
            set({ data: responseData.data, loading: false, source: username ? "portfolio" : "exp" ,idAndCompanyRole});
          } else {
            set({ data: fallbackData, loading: false, source: "fallback" });
          }
        } else {
          set({ data: fallbackData, loading: false, source: "fallback" });
        }
      } catch (error) {
        console.error("Error fetching experience data:", error);
        set({ data: fallbackData, loading: false, source: "fallback" });
      }
    },
  }));
export { useExperienceStoreforPost,useExperienceStore};