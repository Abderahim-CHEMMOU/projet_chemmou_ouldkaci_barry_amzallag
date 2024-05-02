import DashboardNavbar from "./components/eventComponents/DashboardNavbar";
import EventCard from "./components/eventComponents/EventCard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserCard from "./components/userComponents/UserCard";

function App() {
  return (
    <Router>
        <DashboardNavbar/>
        <Routes>
          <Route path="/home" element={<EventCard />} />
          <Route path="/users" element={<UserCard />} />
        </Routes>
    </Router>
  );
}
 
export default App;