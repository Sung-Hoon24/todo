import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { AllTasks } from "./pages/AllTasks";
import { Deadline } from "./pages/Deadline";
import { LandingGate } from "./components/LandingGate";

import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          {/* 랜딩 페이지: MainLayout(사이드바) 없이 풀스크린 */}
          <Route path="/" element={<LandingGate />} />

          {/* 기존 앱: 사이드바 포함 레이아웃 */}
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all-tasks" element={<AllTasks />} />
            <Route path="deadline" element={<Deadline />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
