import React, { useState } from "react";
import { Button, Card, Carousel, Modal, Form } from "react-bootstrap";
import Event from "../../models/event";

type EventItemProps = {
    event: Event;
    onDelete: (id: string) => Promise<void>;
    onUpdate: (updatedEvent: Event) => Promise<void>;
};

const EventItem: React.FC<EventItemProps> = ({ event, onDelete, onUpdate }) => {

    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState<Event>({ ...event });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        await onDelete(event._id);
        handleClose();
    };

    const handleEdit = () => {
        setFormData({ ...event });
        handleShow();
    };

    const handleUpdate = async () => {
        await onUpdate(formData);
        handleClose();
    };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };


// coonvertir au type date pour comparer
const endDate = new Date(event.end_date);


    return (
        <>
            <Card className="event-card" onClick={handleEdit}>
                {event.image && (
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100 event-image" src={event.image} alt="Event" />
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
                    {event.average_rating > 0 && endDate < new Date() &&(
                    <Card.Text>
                        <strong>Note:</strong> {event.average_rating}
                    </Card.Text>
                    )}
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                name="start_date" 
                                value={formData.start_date ? new Date(formData.start_date).toISOString().slice(0, 16) : ''}
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                name="end_date" 
                                value={formData.end_date ? new Date(formData.end_date).toISOString().slice(0, 16) : ''} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="image" 
                                value={formData.image} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleChange}>
                <option value="conférence">Conférence</option>
                <option value="concert">Concert</option>
                <option value="réunion privée">Réunion privée</option>
              </Form.Select>
            </Form.Group>
                        <Form.Group controlId="formMaxParticipants">
                            <Form.Label>Max Participants</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="max_participants" 
                                value={formData.max_participants} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventItem;
