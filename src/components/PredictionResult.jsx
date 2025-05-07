import React from "react";

const PredictionResult = ({ result }) => {
  if (!result) return null; // If there is no result, return nothing.

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Prediction Result</h3>
      {result.error ? (
        <p className="text-red-500">Error: {result.error}</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default PredictionResult;
