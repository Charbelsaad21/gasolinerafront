import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Drivers from './pages/Drivers';
import TankerTrucks from './pages/TankerTrucks';
import Modalities from './pages/Modalities';
import Cities from './pages/Cities';
import States from './pages/States';
import ServiceStations from './pages/ServiceStations';
import Employees from './pages/Employees';
import Vehicles from './pages/Vehicles';
import Owners from './pages/Owners';
import Payments from './pages/Payments';
import Rates from './pages/Rates';
import GetsDispatched from './pages/GetsDispatched';
import WorksIn from './pages/WorksIn';
import Supplies from './pages/Supplies';
import Applies from './pages/Applies'
import Drives from './pages/Drives';
import EmployeesPhones from './pages/EmployeesPhones';
import OwnersPhones from './pages/OwnersPhones';
import Models from './pages/Models';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/tankerTrucks" element={<TankerTrucks />} />
        <Route path="/modalities" element={<Modalities />} />
        <Route path="/cities" element={<Cities/>} />
        <Route path="/states" element={<States/>} />
        <Route path="/servicestations" element={<ServiceStations />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/getsdispatched" element={<GetsDispatched />} />
        <Route path="/WorksIn" element={<WorksIn />} />
        <Route path="/supplies" element={<Supplies />} />
        <Route path="/applies" element={<Applies />} />
        <Route path="/drives" element={<Drives />} />
        <Route path="/employeesphones" element={<EmployeesPhones />} />
        <Route path="/OwnersPhones" element={<OwnersPhones/>} />
        <Route path="/models" element={<Models/>} />

      </Routes>
    </Router>
  );
}

export default App;