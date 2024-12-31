import { useEffect } from "react";
import { Github, Mail, Phone, Linkedin, Twitter } from "lucide-react";
import userDp from "../../assets/dummydp.jpg";
import { useParams } from "react-router-dom";
import { useIntroductionStore } from "../../Zustand/Intro Store/useIntroductionStore";

export default function Introduction() {
  const { username } = useParams();
  // console.log(`username : ${username}`);
  
  const { data, loading, source, fetchIntroData } = useIntroductionStore();
  // console.log(`data : ${JSON.stringify(data)}`);
  // console.log(`source : ${source}`);

  useEffect(() => {
    // Fetch the introduction data without a username parameter by default
    fetchIntroData(username,); // Call the function to fetch the introduction data
  }, [fetchIntroData],username);

  if (loading) return <p>Loading...</p>;

  // Display data based on the source
  const displayData = data || {
    fullName: "Gautam Kumar",
    status: "#OpenToWork",
    title: "Full Stack Developer focused on learning through experimentation and product development.",
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

  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-4">
        {/* Left Content */}
        <div className="space-y-4 text-center sm:text-left w-full sm:w-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {displayData.fullName}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <span className="bg-white text-black px-4 py-1 rounded-full font-medium shadow-sm">
              {displayData.status}
            </span>
            <span className="bg-white text-black px-4 py-1 rounded-full font-medium shadow-sm">
              Tech Enthusiast 📱
            </span>
          </div>

          {/* Role Description */}
          <p className="text-gray-400 text-base sm:text-lg font-medium">
            {displayData.title || "Role description not available."}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-300 justify-center sm:justify-start">
            <div className="w-4 h-4 rounded-full border-2 border-green-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
            </div>
            <span className="text-sm text-gray-400 sm:text-base">
              {displayData.location}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 pt-4 flex-wrap justify-center sm:justify-start">
            <a href={`mailto:${displayData?.socialLinks?.gmail}`} aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href={`tel:${displayData?.socialLinks?.phone}`} aria-label="Phone">
              <Phone className="w-5 h-5" />
            </a>
            <a href={displayData?.socialLinks?.github} aria-label="Github">
              <Github className="w-5 h-5" />
            </a>
            <a href={displayData?.socialLinks?.linkedin} aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={displayData?.socialLinks?.twitter} aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={displayData.image || userDp}
            alt="Profile photo"
            width={160}
            height={160}
            className="rounded-2xl border-2 border-cyan-800/30 shadow-xl"
          />
        </div>
      </div>

      {/* About Section */}
      <section className="mt-8 sm:mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">About</h2>
        <p className="text-gray-300 leading-relaxed text-center sm:text-left">
          {displayData.about}
        </p>
      </section>
    </div>
  );
}
