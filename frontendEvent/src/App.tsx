import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventCard from "./components/eventComponents/EventCard";
import CreateEvent from "./pages/CreateEvent";
import DashboardNavbar from "./components/eventComponents/DashboardNavbar";

function App() {
  return (
    <Router> 
        <DashboardNavbar/>
        <Routes>
          <Route path="/home" element={<EventCard />} />
          {/* <Route path="/create-event" element={<CreateEvent id={''} showModal={false} setShowModal={true}/>} /> */}
        </Routes>
    </Router>
  );
}

export default App;
