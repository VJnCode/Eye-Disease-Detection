import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; // This imports the default export from App.jsx

import { BrowserRouter as Router } from 'react-router-dom';

// Wrap your entire application with Router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
