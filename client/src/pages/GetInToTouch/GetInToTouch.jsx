import { Mail } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GetInToTouch() {
  const { username } = useParams();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchEmail() {
      try {
        const response = await fetch(`/api/getEmail/${username}`);
        const data = await response.json();
        if (data.success && data.userEmail?.email) {
          setEmail(data.userEmail.email);
        } else {
          console.error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    }
    if (username) {
      fetchEmail();
    }
  }, [username]);

  return (
    <div className="bg-[#000814] text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-400 mb-8">Shoot me an email</p>
        <div className="inline-block p-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl shadow-lg">
          <Link to={`mailto:${email}`} target="_blank">
            <div className="relative w-16 h-16">
              <Mail className="w-full h-full text-gray-300" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-400 rounded-full" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
