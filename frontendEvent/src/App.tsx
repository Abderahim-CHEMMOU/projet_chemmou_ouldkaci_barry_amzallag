// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardNavbar from './components/Dashboard/DashboardNavbar';
import EventCard from "./components/eventComponents/EventCard";
import UserCard from "./components/userComponents/UserCard";
import CreateUser from './Pages/CreateUser';
import { AuthProvider } from './Authentification/AuthContext'; // Assurez-vous d'importer correctement le AuthProvider depuis votre AuthContext

function App() {
  return (
    <AuthProvider> {/* Enveloppez votre application avec le contexte d'authentification fourni par AuthProvider */}
      <Router>
        <DashboardNavbar/>
        <Routes>
          <Route path="/home" element={<EventCard />} />
          <Route path="/users" element={<UserCard />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
