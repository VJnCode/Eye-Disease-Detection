import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'; 
      // Make sure the API call is correct with your setup
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data); // Ensure the structure of `data` matches the expected prediction result
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <ImageUpload onUpload={handleImageUpload} isLoading={isLoading} />
          <motion.div layout className="bg-white rounded-lg shadow-md p-6 overflow-hidden">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"
                  ></motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-gray-600 font-medium"
                  >
                    Analyzing image...
                  </motion.p>
                </motion.div>
              )}

              {error && !isLoading && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ErrorMessage message={error} />
                </motion.div>
              )}

              {prediction && !isLoading && !error && (
                <motion.div key="prediction" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PredictionResult prediction={prediction} />
                </motion.div>
              )}

              {!prediction && !isLoading && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Yet</h3>
                  <p className="text-gray-600">Upload a retinal image to receive diagnostic predictions</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white border-t border-gray-200 py-8 mt-16"
      >
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} MEDETHERIAL. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This tool is designed to assist medical professionals and should not replace professional medical advice.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
