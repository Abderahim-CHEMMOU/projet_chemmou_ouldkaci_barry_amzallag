import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Modal } from 'react-bootstrap';
import CreateUser from '../../Pages/CreateUser'; // Importez le composant CreateUser
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom

const Dashboard = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false); // État pour afficher ou masquer la fenêtre modale de création d'utilisateur

    const handleOpenCreateUserModal = () => {
        setShowCreateUserModal(true);
    };

    const handleCloseCreateUserModal = () => {
        setShowCreateUserModal(false);
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="/home">Event Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                            <Nav.Link href="#manage-events">Manage Events</Nav.Link>
                            <Nav.Link href="/create-event">Create Event</Nav.Link>
                            {/* Ajoutez un lien vers la page des utilisateurs */}
                            <Nav.Link as={Link} to="/users">Users</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button variant="outline-light" onClick={handleOpenCreateUserModal}>Create User</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal for Create User */}
            <Modal show={showCreateUserModal} onHide={handleCloseCreateUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateUser />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreateUserModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Dashboard;
