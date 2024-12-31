import React from 'react';

function Faq() {
  return (
    <div className="min-h-screen bg-[#0C0A09] p-8">
      {/* Title Section */}
      <div className="text-center mb-12 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
        Curious? Check Out Our FAQs!
        </h2>
        <p className="text-lg text-gray-300 mb-2">
          Find answers to your questions below
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        <details className="group rounded-lg bg-[#18181B] p-6 [&_summary::-webkit-details-marker]:hidden" open>
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white">
            <h2 className="font-medium text-xl">How quickly can I set up my portfolio?</h2>

            <span className="relative size-5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-300">
            Our platform allows for rapid portfolio creation. With a user-friendly interface and customizable templates, you can have your portfolio up and running in no time, often within minutes.
          </p>
        </details>

        <details className="group rounded-lg bg-[#18181B] p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white">
            <h2 className="font-medium text-xl">Can I share my portfolio with others easily?</h2>

            <span className="relative size-5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-300">
            Yes! You can generate an instant live link to your portfolio, making it
            simple to share your work with potential clients, employers, or colleagues
            right away.
          </p>
        </details>

        <details className="group rounded-lg bg-[#18181B] p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white">
            <h2 className="font-medium text-xl">How can I collaborate with others on my portfolio?</h2>

            <span className="relative size-5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-300">
            We offer tools to connect and collaborate with other talented
            professionals, allowing you to work together on projects, expand your
            network, and enhance your work with input from others.
          </p>
        </details>

        <details className="group rounded-lg bg-[#18181B] p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white">
            <h2 className="font-medium text-xl">Will my portfolio be optimized for search engines?</h2>

            <span className="relative size-5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-300">
            Absolutely! Our SEO optimization feature ensures that your portfolio is
            more visible on search engines, helping you attract more opportunities
            and increase your online presence.
          </p>
        </details>

        <details className="group rounded-lg bg-[#18181B] p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white">
            <h2 className="font-medium text-xl">Is my data safe and private on this platform?</h2>

            <span className="relative size-5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-300">
            We take privacy very seriously. All data is securely stored, and we
            implement industry-standard security practices to protect your
            information. We do not share your data with third parties without your
            consent.
          </p>
        </details>
      </div>
    </div>
  );
}

export default Faq;