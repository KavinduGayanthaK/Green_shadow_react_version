import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootLayout } from "./component/RootLayout";
import StaffPage from "./pages/StaffPage";
import VehiclePage from "./pages/VehiclePage";
import EquipmentPage from "./pages/EquipmentPage";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="staff" element={<StaffPage />} />
          <Route path="vehicle" element={<VehiclePage />} />
          <Route path="equipment" element={<EquipmentPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
