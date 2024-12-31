import React, { Suspense, lazy } from "react";

// Lazy loading components
const Introduction = lazy(() => import("../Introduction/Introduction"));
const Education = lazy(() => import("../Education/Education"));
const Skills = lazy(() => import("../Skills/Skills"));
const Experinnce = lazy(() => import("../Experince/Experinnce"));
const Projects = lazy(() => import("../Projects/Projects"));
const GetInToTouch = lazy(() => import("../GetInToTouch/GetInToTouch"));

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#000814] text-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <Suspense fallback={<div>Loading Introduction...</div>}>
          <Introduction />
        </Suspense>
      </div>

      {/* Education Section */}
      <div>
        <Suspense fallback={<div>Loading Education...</div>}>
          <Education />
        </Suspense>
      </div>

      {/* Skills Section */}
      <div>
        <Suspense fallback={<div>Loading Skills...</div>}>
          <Skills />
        </Suspense>
      </div>

      {/* Experience Section */}
      <div>
        <Suspense fallback={<div>Loading Experience...</div>}>
          <Experinnce />
        </Suspense>
      </div>

      {/* Projects Section */}
      <div>
        <Suspense fallback={<div>Loading Projects...</div>}>
          <Projects />
        </Suspense>
      </div>

      {/* Get In Touch Section */}
      <div>
        <Suspense fallback={<div>Loading Get In Touch...</div>}>
          <GetInToTouch />
        </Suspense>
      </div>
    </div>
  );
}
