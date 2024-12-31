import { create } from "zustand";
import userDp from "../../assets/dummydp.jpg";
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

const fallbackData = {
  fullName: "Gautam Kumar",
  status: "#OpenToWork",
  title: "Hire Me!",
  roleDescription: "Full Stack Developer focused on learning through experimentation and product development.",
  location: "Noida, UP, India",
  image: userDp,
  socialLinks: {
    gmail: "#",
    phone: "#",
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
  about: "Passionate Software Developer with a strong foundation in full-stack development...",
};

const useIntroductionStore = create((set) => ({
  data: null,
  loading: true,
  source: "unknown", // State to identify the source of data

  fetchIntroData: async (username = null) => {
    set({ loading: true });
    try {
      // Determine API endpoint based on whether username is provided
      const apiEndpoint = username
        ? `/api/user/getIntroForPortfolio/${username}`
        : `/api/user/getIntro`;

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
          set({ data: responseData.data, loading: false, source: username ? "portfolio" : "intro" });
        } else {
          set({ data: fallbackData, loading: false, source: "fallback" });
        }
      } else {
        set({ data: fallbackData, loading: false, source: "fallback" });
      }
    } catch (error) {
      console.error("Error fetching intro data:", error);
      set({ data: fallbackData, loading: false, source: "fallback" });
    }
  },
}));


const useUserIntroStoreForPost = create(
  persist(
    (set) => ({
      formData: {
        fullName: '',
        status: '',
        title: '',
        location: '',
        socialLinks: {
          gmail: '',
          phone: '',
          github: '',
          linkedin: '',
          twitter: '',
        },
        image: '', // This will store the image file path or data URL, used for display or sending
        about: '',
      },
      isCreate: false,
      isCreateLoading: false,
      isUpdateLoading: false,
      isDeleteLoading: false,
      handleCreate: async (data,file) => {
        set({ isCreateLoading: true });
        set({ isCreate: true });
        try {
          const formData = new FormData(); // Create a new FormData object
          
          // Append all text fields to the formData
          formData.append("fullName", data.fullName);
          formData.append("status", data.status);
          formData.append("title", data.title);
          formData.append("location", data.location);
          formData.append("about", data.about);
          
          formData.append('socialLinks', JSON.stringify(data.socialLinks));

          // Append image file if exists
          if (file) {
            formData.append("image", file); // Assuming `data.image` is a file object (from the file upload input)
          }

          const response = await fetch("/api/user/createIntro", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
            },
            body: formData, // Send FormData as the body
          });
          const responseData = await response.json();
          if (response.ok) {
            set({ formData: responseData, isCreate: true });
            toast.success("Introduction created successfully");
          } else {
            toast.error(responseData.message || "Error creating introduction");
            if (responseData.errors) {
              Object.values(responseData.errors).forEach(error => {
                toast.error(error.message);
              });
            }
          }
        } catch (error) {
          toast.error("Error creating introduction");
        } finally {
          set({ isCreateLoading: false });
          set({ isCreate: false });
        }
      },
      handleUpdate: async (data,file) => {
        set({ isUpdateLoading: true });
        try {
          const formData = new FormData(); // Create a new FormData object for update

          // Append all text fields to the formData
          formData.append("fullName", data.fullName);
          formData.append("status", data.status);
          formData.append("title", data.title);
          formData.append("location", data.location);
          formData.append("about", data.about);
          
          formData.append('socialLinks', JSON.stringify(data.socialLinks));

          // Append image file if exists
          if (file) {
            formData.append("image", file); 
          }

          const response = await fetch("/api/user/updateIntro", {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
            },
            body: formData, // Send FormData as the body
          });
          const responseData = await response.json();
          // console.log(`responseData: ${JSON.stringify(responseData)}`);
          
          if (response.ok) {
            toast.success("Introduction updated successfully");
          } else {
            
            toast.error(responseData.message || "Error updating introduction");
          }
        } catch (error) {
          toast.error("Error updating introduction");
        } finally {
          set({ isUpdateLoading: false });
        }
      },
      handleDelete: async () => {
        set({ isDeleteLoading: true });
        try {
          const response = await fetch(`/api/user/deleteIntro`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          });
          
          const responseData = await response.json();
          if (response.ok) {
            set({
              formData: {
                fullName: '',
                status: '',
                title: '',
                location: '',
                socialLinks: {
                  gmail: '',
                  phone: '',
                  github: '',
                  linkedin: '',
                  twitter: '',
                },
                image: '',
                about: '',
              },
              isCreate: false,
            });
            toast.success("Introduction deleted successfully");
          } else {
            toast.error(responseData.message);
          }
        } catch (error) {
          
          toast.error("Error deleting introduction");
        } finally {
          set({ isDeleteLoading: false });
        }
      },
    }),
    {
      name: "user-intro-storage", // Key in local storage
    }
  )
);


export { useIntroductionStore, useUserIntroStoreForPost };
