import React, { useEffect } from 'react';
import { useEducationStore } from '../../Zustand/Education Store/useEducationStore';
import { useParams } from 'react-router-dom';
function Education() {
  const { username } = useParams();
  const { data, loading, source, fetchEduData } = useEducationStore();
  // console.log(`data : ${JSON.stringify(data)}`);
  // console.log(`source : ${source}`);
  useEffect(() => {
    
    fetchEduData(username,); 
  }, [fetchEduData],username);

  if (loading) return <p>Loading...</p>;
 
  return (
    <div>
      <div className="text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 md:mb-6 text-center sm:text-left text-white">
            Education
          </h2>

          <div className="bg-[#09101E] rounded-lg p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
              {/* College Info */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-center sm:text-left text-white">
                  {data?.collegeName}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
                  {data?.branchName}
                </p>
              </div>

              {/* Year */}
              <div className="flex-shrink-0 text-gray-400 text-sm sm:text-base font-medium text-center sm:text-right order-first sm:order-last w-full sm:w-auto">
                {data?.passoutYear}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
