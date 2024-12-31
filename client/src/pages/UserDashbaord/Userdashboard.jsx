import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  LayoutDashboard,
  Eye,
  User,
  GraduationCap,
  Lightbulb,
  FolderKanban,
  LogOut,
  Briefcase,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Target
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import UserEduaction from "./Education/UserEduaction";
import UserSkills from "./Skills/UserSkills";
import UserProjects from "./Projects/UserProjects";
import UserExperience from "./Experience/UserExperience";
import useAuthStore from "../../Zustand/Auth Store/useAuthStore";
import { toast } from 'sonner'
import UserIntroduction from "./Introduction/UserIntroduction";
import GetYourPortfolio from "../Get Your Portfolio/GetYourPortfolio";
export default function UserDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const navigation = [
    { name: 'Preview Portfolio', icon: Eye, to: '/preview-portfolio', newTab: true },
    { name: 'Home', icon: LayoutDashboard, to: '/', newTab: true },
    { name: 'Introduction', icon: User, to: '/user-dashboard/introduction' },
    { name: 'Education', icon: GraduationCap, to: '/user-dashboard/education' },
    { name: 'Skills', icon: Lightbulb, to: '/user-dashboard/skills' },
    { name: 'Experiences', icon: Briefcase, to: '/user-dashboard/experience' },
    { name: 'Projects', icon: FolderKanban, to: '/user-dashboard/projects' },
    { name: 'Get Portfolio Link', icon: Target, to: '/user-dashboard/get-portfolio-your-link' },
  ];

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleNavigation = (to) => {
    navigate(to);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed top-0 left-0 h-screen bg-gray-800 border-r border-gray-700 transition-all duration-300 z-40",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between h-12">
              {!isCollapsed && (
                <h2 className="text-lg font-semibold truncate">User Dashboard</h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hover:bg-gray-700"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full hover:bg-gray-700 relative group",
                    isCollapsed ? "justify-center" : "justify-start"
                  )}
                  asChild
                >

                  <Link
                    to={item.to}
                    className="flex items-center gap-2"
                    target={item.newTab ? "_blank" : "_self"}

                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                    {isCollapsed && (
                      <span className="absolute left-14 bg-gray-700 text-white rounded-md px-2 py-1 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.name}
                      </span>
                    )}
                  </Link>

                </Button>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <Button
              variant="ghost"
              className={cn(
                "w-full hover:bg-gray-700",
                isCollapsed ? "justify-center" : "justify-start gap-2"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>Logout</span>}
              {isCollapsed && (
                <span className="absolute left-14 bg-gray-700 text-white rounded-md px-2 py-1 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Logout
                </span>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-50"
          onClick={toggleMobileMenu}
        >
          <div
            className="fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">User Dashboard</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="hover:bg-gray-700"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-gray-700"
                  onClick={() => handleNavigation(item.to)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Button>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-gray-700"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 z-40">
        <div className="flex items-center justify-between px-4 h-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-lg font-semibold">User Dashboard</h2>
          <div className="w-10" /> {/* Placeholder for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          "md:ml-20",
          !isCollapsed && "md:ml-64"
        )}
      >
        <div className="p-4 pt-20 md:pt-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="introduction" element={<UserIntroduction />} />
            <Route path="education" element={<UserEduaction />} />
            <Route path="skills" element={<UserSkills />} />
            <Route path="experience" element={<UserExperience />} />
            <Route path="projects" element={<UserProjects />} />
            <Route path="get-portfolio-your-link" element={<GetYourPortfolio />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}