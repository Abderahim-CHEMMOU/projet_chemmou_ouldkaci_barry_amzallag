import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Spinner
  } from "react-bootstrap";
import Event from "../../models/event";
import EventItem from "./EventItem";
import EventSearch from "./EventSearch";
import CreateEvent from "../../Pages/CreateEvent";

const EventCard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(3);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:8080/events");
                
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                console.log(data)
                setEvents(data);
            } catch (err) {
                setError("Failed to fetch events");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
 
        fetchEvents();
    }, []);

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

    const handleUpdateEvent = async (updatedEvent: Event) => {
        try {
          const updatedLinksWithoutId = updatedEvent.links.map(link => {
            const { _id, ...rest } = link;
            return rest;
        });
        const updatedParticipantsWithoutId = updatedEvent.participants.map(participant => {
          const { _id, ...rest } = participant;
          return rest;
      });
          const event = {
            "title": updatedEvent.title,
            "description": updatedEvent.description,
            "start_date": updatedEvent.start_date,
            "end_date": updatedEvent.end_date,
            "location": updatedEvent.location,
            "image": updatedEvent.image,
            "participants": updatedParticipantsWithoutId,
            "links": updatedLinksWithoutId,
            "type": updatedEvent.type,
            "max_participants": updatedEvent.max_participants,
          }
            let response = await fetch(`http://localhost:8080/events/${updatedEvent._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            });
            if (!response.ok) {
                throw new Error("Failed to update event");
            }
            const updatedEvents = events.map(event =>
                event._id === updatedEvent._id ? updatedEvent : event
            );
            setEvents(updatedEvents);
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

  

    const closeModal = () => {
        setShowModal(false);
        // Your implementation here
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
            <Button variant="primary" onClick={() => openModal()}>
                Créer un événement
            </Button>
            {showModal && 
            <CreateEvent 
              id={""} 
              showModal={showModal}   
              setShowModal={closeModal} 
            />}
            <h1 className="mb-4 text-center event-list-title">Liste des événements</h1>
            <EventSearch onSearch={(searchParams) => console.log(searchParams)} />
            <Row xs={1} md={2} lg={3} className="g-4">
                {currentItems.map((event, index) => (
                    <Col key={index}>
                        <EventItem 
                            event={event} 
                            onDelete={handleDelete} 
                            onUpdate={handleUpdateEvent}
                        />
                    </Col>
                ))}
            </Row>
            <div className="pagination">
                <Button variant="outline-primary" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Précédent</Button>{' '}
                <Button variant="outline-primary" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(events.length / itemsPerPage)}>Suivant</Button>
            </div>
        </Container>
    );
};

export default EventCard;
