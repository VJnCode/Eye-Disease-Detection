// PredictionResult.jsx

import ErrorMessage from "./ErrorMessage";

export default function PredictionResult({ result }) {
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
            {/* {JSON.stringify(result, null, 2)} */}
            {result.prediction}
          </pre>
        </>
      )}
    </div>
  );
}
