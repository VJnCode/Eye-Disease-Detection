import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ImageUpload from "../components/ImageUpload";

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
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full m-0 w-screen bg-gray-50"
    >
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex justify-center items-start"
        >
          <ImageUpload onUpload={handleImageUpload} isLoading={isLoading} />
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
            This tool is designed to assist medical professionals and should not
            replace professional medical advice.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
