import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/landing";
import CryptoRoute from "./components/crypto/CryptoRoute";
import TaskRoute from "./components/tasks/TaskRoute";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
         <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/crypto" element={<CryptoRoute />} />
          <Route path="/tasks" element={<TaskRoute />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
