import { Badge } from "../../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Github, Globe } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useProjectStore } from "../../Zustand/Project Store/useProjectStore"
import { useEffect } from "react"
export default function Projects() {
  const { username } = useParams();
  // console.log(`username : ${username}`);

  const { data, loading, source, fetchProjectData} = useProjectStore();
  // console.log(`data : ${JSON.stringify(data)}`);
  // console.log(`source : ${source}`);
// console.log(`idAndCompanyRole : ${JSON.stringify(idAndCompanyRole)}`);

  useEffect(() => {
    fetchProjectData(username);
  }, [fetchProjectData, username]);

  if (loading) return <p>Loading...</p>;
  return (
    <section className="bg-[#000814] text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((project) => (
            <Card key={project._id} className="bg-[#101825] border-gray-700">
              <CardHeader className="p-0">
                <img
                  loading="lazy"
                  src={project.projectImage}
                  alt={`${project.title} preview`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project?.techstack?.map((tech) => (
                    <Badge key={tech} variant="secondary"
                      className="bg-[#1e293b] hover:bg-[#2d3c51] text-gray-200 px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full 
                    transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 hover:transform hover:scale-105">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-[#101825] text-gray-300 hover:bg-[#101825] hover:text-white"
                >
                  <Link
                    to={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-[#101825] text-gray-300 hover:bg-[#101825] hover:text-white"
                >
                  <Link
                    to={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>

              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}