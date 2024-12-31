import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const fallbackData = {
    "collegeName": "Priyadarshini College of Engineering",
    "branchName": "Bachlor of technology in Computer Technology", 
    "passoutYear": "2020-2024"
}
const useEducationStoreforPost = create(
    persist(
        (set) => ({
            isCreate: false,
            isLoading: false,
            handleCreate: async (data) => {
                set({ isLoading: true });
                try {
                    const response = await fetch("/api/user/createEdu", {
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
                        toast.success("Education created successfully");
                    } else {
                        toast.error(responseData.message || "Error creating education");

                    }
                } catch (error) {
                    toast.error("Error creating education");
                } finally {
                    set({ isLoading: false });
                }
            },
            handleUpdate: async (data) => {
                set({ isLoading: true });
                try {
                    const response = await fetch("/api/user/updateEdu", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(data),
                    });
                    const responseData = await response.json();
                    if (response.ok) {
                        toast.success("Education updated successfully");
                    } else {
                        toast.error(responseData.message || "Error updating education");
                    }
                } catch (error) {
                    toast.error("Error updating education");
                } finally {
                    set({ isLoading: false });
                }
            },
            handleDelete: async () => {
                set({ isLoading: true });
                try {
                    const response = await fetch(`/api/user/deleteEdu`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    if (response.ok) {
                        set({ isCreate: false });
                        toast.success("Education deleted successfully");
                    } else {
                        toast.error("Error deleting education");
                    }
                } catch (error) {
                    toast.error("Error deleting education");
                } finally {
                    set({ isLoading: false });
                }
            },

        }),

        {
            name: "education-storage", // Key in local storage
        }
    )
)

  const useEducationStore = create((set) => ({
    data: null,
    loading: true,
    source: "unknown", // State to identify the source of data
  
    fetchEduData: async (username = null) => {
      set({ loading: true });
      try {
        // Determine API endpoint based on whether username is provided
        const apiEndpoint = username
          ? `/api/user/getEduForPortfolio/${username}`
          : `/api/user/getEdu`;
  
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
            set({ data: responseData.data, loading: false, source: username ? "portfolio" : "edu" });
          } else {
            set({ data: fallbackData, loading: false, source: "fallback" });
          }
        } else {
          set({ data: fallbackData, loading: false, source: "fallback" });
        }
      } catch (error) {
        console.error("Error fetching education data:", error);
        set({ data: fallbackData, loading: false, source: "fallback" });
      }
    },
  }));
  
export { useEducationStoreforPost,useEducationStore}