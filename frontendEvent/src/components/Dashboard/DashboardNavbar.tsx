import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Modal, Form } from 'react-bootstrap';
import CreateUser from '../../Pages/CreateUser';
import { Link } from 'react-router-dom';
import CreateEvent from "../../Pages/CreateEvent";


const DashboardNavbar = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleOpenCreateUserModal = () => {
        setShowCreateUserModal(true);
    };

    const handleCloseCreateUserModal = () => {
        setShowCreateUserModal(false);
    };

    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleLogin = () => {
        console.log('Connexion en cours...');
    };

    
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        // Your implementation here
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
                            <Nav.Link onClick={handleOpenLoginModal}>Login</Nav.Link>
                            <Button variant="primary" onClick={() => openModal()}>
                                Créer un événement
                            </Button>
                        </Nav>
                        <Nav className="ml-auto">
                            <Button variant="outline-light" onClick={handleOpenCreateUserModal}>Create User</Button>
                            {/* Utilisez le composant Link ici */}
                            <Link to="/users" className="btn btn-outline-light">Users</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showModal && 
            <CreateEvent 
              id={""} 
              showModal={showModal}   
              setShowModal={closeModal} 
            />}
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

            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleLogin}>Login</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};


export default DashboardNavbar;

