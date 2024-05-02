import DashboardNavbar from "./components/eventComponents/DashboardNavbar";
import EventCard from "./components/eventComponents/EventCard";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
function App() {
  return (
    <Router>
        <DashboardNavbar/>
        <Routes>
          <Route path="/home" element={<EventCard />} />
        </Routes>
    </Router>
  );
}
 
export default App;