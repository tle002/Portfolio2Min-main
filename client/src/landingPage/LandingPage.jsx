import { Link } from "react-router-dom";
import React, { Suspense } from "react";
import { HeroVideoDialogDemoTopInBottomOut } from "./HeroVideo";
import { SafariMockup } from "./SafariMockup";

// Lazy load components
const Faq = React.lazy(() => import("../pages/Faq/Faq"));
const Features = React.lazy(() => import("../pages/Features/Features"));
const HowItWorks = React.lazy(() => import("../pages/How it works/HowItWorks"));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section with constrained width */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-[90%] md:max-w-4xl text-center space-y-6 md:space-y-8 mt-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-400 to-green-400 text-transparent bg-clip-text px-2">
            Build Your Portfolio in Just 2 Minutes!
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-2">
            Effortlessly create a stunning portfolio and showcase your talents instantly with our intuitive generator!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 px-2">
            <button className="relative block group w-full sm:w-48">
              <span className="absolute inset-0 bg-indigo-500 rounded-lg"></span>
              <div className="relative bg-zinc-950 border-2 border-indigo-500 rounded-lg transition-all duration-200 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                <Link to={"/login"}>
                  <div className="px-4 sm:px-6 py-3">
                    <p className="text-base sm:text-lg font-semibold text-white whitespace-nowrap">
                      Get Started
                    </p>
                  </div>
                </Link>
              </div>
            </button>

            <button className="w-full sm:w-48 bg-zinc-950 text-zinc-300 border border-zinc-700 border-b-4 font-medium overflow-hidden relative px-4 sm:px-6 py-3 rounded-lg hover:brightness-110 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-zinc-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              <span className="text-base sm:text-lg whitespace-nowrap">Learn More</span>
            </button>
          </div>

          <div>
            <HeroVideoDialogDemoTopInBottomOut />
          </div>
        </div>
      </div>

      {/* Motivation Section */}
      <div className="w-full bg-zinc-950 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              Don't Let Your Career Potential Go Unnoticed
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4">
                <span className="text-5xl">😟</span>
                <p className="text-center text-gray-300">
                  Struggling to stand out in a crowded job market
                </p>
                <span className="text-gray-400">➔</span>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <span className="text-5xl">😕</span>
                <p className="text-center text-gray-300">
                  Unsure how to showcase skills effectively online
                </p>
                <span className="text-gray-400">➔</span>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <span className="text-5xl">😞</span>
                <p className="text-center text-gray-300">
                  Missing out on opportunities due to poor online presence
                </p>
              </div>
            </div>

            <p className="text-gray-400 mt-4">⬇ there is an easier way</p>
          </div>
        </div>
      </div>

      {/* Mockup */}
      <div>
        <SafariMockup />
      </div>

      {/* How It Works Section */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full">
          <HowItWorks />
        </div>

        {/* Features Section */}
        <Features />

        {/* FAQ */}
        <div>
          <Faq />
        </div>
      </Suspense>
    </div>
  );
}
