/* eslint-disable jsx-a11y/img-redundant-alt */
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";

import {
  Alert,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";

import "../../styles/event.css"

type Event = {
  id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  image?: string;
  participants: [{ user_id: mongoose.Types.ObjectId; rating: number }];
  average_rating?: number;
  links?: [{ title: string; url: string }];
  type?: { type: string; enum: ["conférence", "concert", "réunion privée"] };
  max_participants?: number;
};

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
    // const updatedEvents = events.filter(event => !event.id.equals(id));
    // setEvents(updatedEvents);
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
            <Card className="event-card">
              {event.image && (
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 event-image"
                      src={event.image}
                      alt="Event image"
                    />
                  </Carousel.Item>
                </Carousel>
              )}
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
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
                  <strong>Type:</strong> {event.type?.type}
                </Card.Text>
                <Card.Text>
                  <strong>Max Participants:</strong> {event.max_participants}
                </Card.Text>
                {event.average_rating && (
                  <Card.Text>
                    <strong>Average Rating:</strong>{" "}
                    {event.average_rating.toFixed(1)}
                  </Card.Text>
                )}
                {event.links && event.links.length > 0 && (
                  <ListGroup className="event-links">
                    {event.links.map((link, linkIndex) => (
                      <ListGroup.Item
                        key={linkIndex}
                        action
                        href={link.url}
                        target="_blank"
                      >
                        {link.title}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
                <Button variant="danger" className="mt-2" onClick={() => handleDelete(event.id)}>
                  Delete Event
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventList;
