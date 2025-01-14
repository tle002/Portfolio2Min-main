import React from 'react'
import { Link } from 'react-router-dom'

const GitHubIcon = (props) => {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
      />
    </svg>
  )
}

const XIcon = (props) => {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M11.1527 8.92804L16.2525 3H15.044L10.6159 8.14724L7.07919 3H3L8.34821 10.7835L3 17H4.20855L8.88474 11.5643L12.6198 17H16.699L11.1524 8.92804H11.1527ZM9.49748 10.8521L8.95559 10.077L4.644 3.90978H6.50026L9.97976 8.88696L10.5216 9.66202L15.0446 16.1316H13.1883L9.49748 10.8524V10.8521Z" />
    </svg>
  )
}

const LinkedInIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.452 2H3.548C2.692 2 2 2.687 2 3.539v16.923C2 21.313 2.692 22 3.548 22h16.905c.857 0 1.548-.687 1.548-1.538V3.539C22 2.687 21.309 2 20.452 2ZM8.471 19.408H5.647V9.776h2.824v9.632ZM7.058 8.507c-.903 0-1.635-.732-1.635-1.634 0-.903.732-1.634 1.635-1.634s1.635.731 1.635 1.634c0 .902-.732 1.634-1.635 1.634ZM18.353 19.408h-2.824v-4.774c0-1.137-.023-2.598-1.582-2.598-1.583 0-1.827 1.238-1.827 2.518v4.854H9.297V9.776h2.713v1.316h.037c.378-.713 1.3-1.464 2.68-1.464 2.87 0 3.403 1.892 3.403 4.354v5.426Z" />
    </svg>
  );
};


const SocialLink = ({
  href,
  icon: Icon,
  children,
}) => {
  return (
    <Link to={href} target="_blank" rel="noreferrer" className="group">
      <span className="sr-only">{children}</span>
      <Icon className="h-5 w-5 fill-gray-300 transition group-hover:fill-gray-100 dark:group-hover:fill-gray-200" />
    </Link>
  )
}

const Footer = () => {
  return (
    <footer className="w-full border-gray-300 border-t  dark:border-gray-600 bg-[#0C0A09] text-white py-4">
      <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between px-4">
        
        {/* Left-aligned 'Made By' section */}
        <div className="flex-1 text-center md:text-left text-sm text-gray-300 dark:text-gray-400">
          Made with 💖 by Abhishek
        </div>
        
        {/* Center-aligned Copyright Section */}
        <p className="flex-1 text-center text-xs md:text-sm text-gray-300 dark:text-gray-400">
          &copy; {new Date().getFullYear()}{' '}
          <a
            href="https://x.com/Abhishe93466529"
            className="text-green-500 font-semibold underline hover:text-red-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio2Min
          </a>
        </p>
        
        {/* Right-aligned Social Links */}
        <div className="flex-1 flex justify-center md:justify-end gap-4">
          <SocialLink href="https://x.com/Abhishe93466529" icon={XIcon} className="text-gray-400 hover:text-blue-500">
            X
          </SocialLink>
          <SocialLink href="https://github.com/tle002" icon={GitHubIcon} className="text-gray-400 hover:text-white">
            GitHub
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/abhishek-k-g/" icon={LinkedInIcon} className="text-gray-400 hover:text-purple-500">
          LinkedIn
          </SocialLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer
