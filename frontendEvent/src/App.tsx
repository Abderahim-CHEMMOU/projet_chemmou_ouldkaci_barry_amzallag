import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardNavbar from './components/Dashboard/DashboardNavbar';
import EventCard from "./components/eventComponents/EventCard";
import UserCard from "./components/userComponents/UserCard";
import CreateUser from './Pages/CreateUser';


function App() {
  return (
    <Router>
      <DashboardNavbar/>
      <Routes>
        <Route path="/home" element={<EventCard />} />
        <Route path="/users" element={<UserCard />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;