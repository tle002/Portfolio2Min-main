import React, { useEffect } from "react";
import { useExperienceStore } from "../../Zustand/Expreince Store/useExperienceStore";
import { useParams } from "react-router-dom";

export default function Experience() {
  const { username } = useParams();
  // console.log(`username : ${username}`);

  const { data, loading, source, fetchExpData } = useExperienceStore();
  // console.log(`source : ${source}`);

  useEffect(() => {
    // console.log(`data : ${JSON.stringify(data)}`);
    fetchExpData(username);
  }, [fetchExpData, username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#000814] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-12">
          <h2 className="text-3xl font-bold inline-flex items-center gap-2">
            Work Experience
          </h2>
        </div>

        <div className="relative pl-8 space-y-12">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-gray-700" />

          {/* Corrected Loop */}
          {data?.map((experience) => (
            <div key={experience?._id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-[-33px] w-6 h-6 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="p-4 border border-gray-700 bg-gray-800 rounded-lg text-gray-100">
                <h3 className="text-xl font-bold">{experience.companyAndRole}</h3>
                <p className="text-gray-400">{experience.duration}</p>
                <h4 className="mt-2 font-semibold">Responsibilities:</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {experience.responsibilities.map((res, index) => (
                    <li key={`${experience._id}-responsibility-${index}`}>{res}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
