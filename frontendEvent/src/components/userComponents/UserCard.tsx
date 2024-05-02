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
import "../../styles/user.css";

type User = {
  id: mongoose.Types.ObjectId;
  last_name: String;
  first_name: String;
  age: number;
  email: String;
  password: String;
  created_at:  Date;

};

const UserCard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [users]);

  const handleDelete = (id: mongoose.Types.ObjectId) => {
    // const updatedUsers = events.filter(user => !user.id.equals(id));
    // setUsers(updatedUsers);
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
    <Container className="user-list-container">
      <h1 className="mb-4 text-center user-list-title">Events List</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {users.map((user, index) => (
          <Col key={index}>
            <Card className="user-card">
              <Card.Body>
                <Card.Title>{user.last_name}</Card.Title>
                <Card.Text>{user.first_name}</Card.Text>
                <Card.Text>{user.age}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserCard;
