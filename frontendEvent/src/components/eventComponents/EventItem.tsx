import React, { useState } from "react";
import { Button, Card, Carousel, ListGroup, Modal } from "react-bootstrap";
import Event from "../../models/event";

type EventItemProps = {
    event: Event;
    onDelete: (id: string) => Promise<void>;
};

const EventItem: React.FC<EventItemProps> = ({ event, onDelete }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete = async () => {
        await onDelete(event._id);
        handleClose();
    };

    return (
        <>
            <Card className="event-card" onClick={handleShow}>
                {event.image && (
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100 event-image" src={event.image} alt="Event image" />
                        </Carousel.Item>
                    </Carousel>
                )}
                <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                        <strong>Start:</strong>{" "}
                        {new Date(event.start_date).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                        <strong>End:</strong>{" "}
                        {new Date(event.end_date).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                        <strong>Location:</strong> {event.location}
                    </Card.Text>
                    <Card.Text>
                        <strong>Type:</strong> {event.type}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{event.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="d-block w-100 event-image" src={event.image} alt="Event image" />
                    <div><strong>Description:</strong> {event.description}</div>
                    <div><strong>Start:</strong> {new Date(event.start_date).toLocaleDateString()}</div>
                    <div><strong>End:</strong> {new Date(event.end_date).toLocaleDateString()}</div>
                    <div><strong>Location:</strong> {event.location}</div>
                    <div><strong>Type:</strong> {event.type}</div>
                    <div><strong>Max Participants:</strong> {event.max_participants}</div>
                    <div><strong>Event note :</strong> {event.average_rating}</div>
                    {event.links && (
                        <ListGroup className="event-links">
                            {event.links.map((link, index) => (
                                <ListGroup.Item key={index} action href={link.url} target="_blank">
                                    {link.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventItem;

