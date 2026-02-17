import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { AllTasks } from "./pages/AllTasks";
import { Deadline } from "./pages/Deadline";

import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
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
