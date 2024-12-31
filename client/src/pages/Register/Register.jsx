import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from 'sonner'
import { useNavigate } from "react-router-dom"
export default function Register() {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    username:'',
    email:'',
    password:''
  })
  const [loading, setLoading] = useState(false);
  const handelInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Registration successful");
        navigate("/login");
        setUser({ username: "", email: "", password: ""});
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(responseData.message);
        
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C0A09]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#18181B] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div>
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Create an Account
            </h2>

            <form onSubmit={handleSubmit}>
              <Input
                icon={User}
                type='username'
                placeholder='Username'
                name='username'
                value={user.username} 
                onChange={handelInput}
              />

              <Input
                icon={Mail}
                type="email"
                placeholder="Enter your email"
                name="email"
                value={user.email} 
                onChange={handelInput}
              />

              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                name="password"
                value={user.password} 
                onChange={handelInput}
              />

              <div className="mt-4">
              <Button
                  variant="secondary"
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-400 to-green-500 text-white hover:from-teal-500 hover:to-cyan-600"
                >
                {loading ? "Loading..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </div>

          {/* "Don't have an account?" Section */}
          <div className="px-8 py-4 bg-[#121112] bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
              Already have an account?
              <Link to="/login" className="text-green-400 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
