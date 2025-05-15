// PredictionResult.jsx

import ErrorMessage from "./ErrorMessage";

export default function PredictionResult({ result, loading, hasUploaded }) {
  if (!hasUploaded) {
    return (
      <div className="mt-4 text-gray-500 italic">
        Awaiting image upload...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-4 text-gray-600">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span>Analyzing image...</span>
        </div>
      </div>
    );
  }

  if (!result) return <ErrorMessage />;

  return (
    <div className="mt-4">
      {result.error ? (
        <p className="text-red-500">Error: {result.error}</p>
      ) : (
        <>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Prediction Result:
          </h3>
          <pre className="bg-gray-100 p-4 rounded-lg">
            {result.prediction}
          </pre>
        </>
      )}
    </div>
  );
}
