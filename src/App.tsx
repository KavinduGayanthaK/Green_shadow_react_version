import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootLayout } from "./component/RootLayout";
import StaffSection from "./pages/StaffSection";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="staff" element={<StaffSection />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
