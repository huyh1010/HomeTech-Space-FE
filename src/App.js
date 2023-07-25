import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./theme";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
