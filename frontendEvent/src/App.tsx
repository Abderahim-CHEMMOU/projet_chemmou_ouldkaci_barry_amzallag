import DashboardNavbar from "./components/Dashboad/DashboardNavbar";
import EventCard from "./components/eventComponents/EventCard";
// import EventsDetails from "./components/eventComponents/EventsDetails";
// import CreateEvent from './pages/createEvent';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <DashboardNavbar />
      <Routes>
        <Route path="/home" element={<EventCard />} />

        {/* <Route path="/events/:eventId" element={<EventsDetails />} /> */}
        {/* <Route path="/create-event" element={<CreateEvent />} /> */}
      </Routes>
    </Router>
  );
}

export default App;