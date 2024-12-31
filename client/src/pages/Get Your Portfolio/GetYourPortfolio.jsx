import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { useState } from "react";
import { toast } from "sonner";

export default function GetYourPortfolio() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const username = userData?.username;
  const [showModal, setShowModal] = useState(false);

  const portfolioUrl = `${window.location.origin}/personal-portfolio/${username}`;

  const handleGenerateClick = () => {
    setShowModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#111827]">
      <Card className="w-full max-w-md border border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-100">Get Your Portfolio Link</CardTitle>
          <CardDescription className="text-center text-gray-400">Generate a unique link to showcase your work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGenerateClick}
            className="w-full bg-blue-600 text-gray-100 hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500"
            size="lg"
          >
            Generate Portfolio
          </Button>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg" role="alert">
            <p className="font-bold">Note:</p>
            <p>Before clicking Generate Link, ensure every section is filled out and all details are entered accurately.</p>
          </div>
        </CardContent>
      </Card>

      {/* Modal for showing the portfolio link */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-[#111827]">
          <div className="bg-[#111827] p-6 rounded-lg shadow-lg text-gray-100 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Your Portfolio Link</h2>
            <p className="mb-4">
              Here is your unique portfolio link. Click "Copy Link" to save it.
            </p>
            <div className="flex items-center justify-between bg-[#111827] p-2 rounded">
              <span className="text-sm text-blue-400 truncate">{portfolioUrl}</span>
              <button
                onClick={handleCopyLink}
                className="ml-4 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded"
              >
                Copy Link
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
