import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";


export function AvatarDemo() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAvatarClick = () => {
    setShowDropdown((prev) => !prev);
  };


  return (
    <div className="relative inline-block">
      <Avatar onClick={handleAvatarClick} className="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-[#18181B] rounded-lg shadow-lg p-4 z-10">
          <p className="text-white-900 font-semibold">Username</p>
          <p className="text-white-500 text-sm mb-3">user@example.com</p>
          
          <button
            
            className="flex items-center gap-2 text-red-500 font-medium hover:text-green-800 font-semibold mb-3"
          >
            <LogInIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function LogInIcon(props) {
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
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
      </svg>
    )
  }
  
  