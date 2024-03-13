import "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FundPage from "./page/fundPage";
import ComparePage from "./page/comparePage";
import DashboardPage from "./page/dashboardPage";
import ChartPage from "./page/chartPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/funds" element={<FundPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
};

export default App;