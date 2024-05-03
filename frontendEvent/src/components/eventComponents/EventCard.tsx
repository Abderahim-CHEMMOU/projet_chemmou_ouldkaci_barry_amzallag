import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { Event } from "../../models/event";
import "../../styles/event.css";
import EventItem from "./EventItem";

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    const handleDelete = (id: mongoose.Types.ObjectId) => {

    };

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
            <Row xs={1} md={2} lg={3} className="g-4">
                {events.map((event, index) => (
                    <Col key={index}>
                        <EventItem event={event} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default EventList;