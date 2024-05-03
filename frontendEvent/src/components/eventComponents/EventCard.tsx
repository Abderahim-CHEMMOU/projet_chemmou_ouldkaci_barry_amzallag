import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Carousel, Col, Container, ListGroup, Modal, Row, Spinner } from "react-bootstrap";
import Event from "../../models/event";
import EventItem from "./EventItem";
import EventSearch from "./EventSearch"; // Importez EventSearch

const EventCard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(3);
 
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:8080/events");
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                setError("Failed to fetch events");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
 
        fetchEvents();
    }, [events]);
 
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/events/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete event");
            }
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = events.slice(firstItemIndex, lastItemIndex);
 
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    if (loading)
        return (
            <Spinner animation="border" className="spinner" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    if (error)
        return (
            <Alert variant="danger" className="error-alert">
                {error}
            </Alert>
        );
 
    return (
        <Container className="event-list-container">
            <h1 className="mb-4 text-center event-list-title">Events List</h1>
            <EventSearch onSearch={(searchParams) => console.log(searchParams)} /> {/* Inclure EventSearch ici */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {currentItems.map((event, index) => (
                    <Col key={index}>
                        <EventItem event={event} onDelete={handleDelete} />
                    </Col>
                ))}
            </Row>
            <div className="pagination">
                <Button variant="outline-primary" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>{' '}
                <Button variant="outline-primary" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(events.length / itemsPerPage)}>Next</Button>
            </div>
        </Container>
    );
};
 

export default EventCard;

