import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

const DashboardNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="/home">Event Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                        <Nav.Link href="#manage-events">Manage Events</Nav.Link>
                        <Nav.Link href="/create-event">Create Event</Nav.Link>
                    </Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
                        ) : (
                            <Button variant="outline-light" onClick={handleLogin}>Login</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;