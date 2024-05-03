import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import "../../styles/user.css";

type User = {
  _id: string; // Utilisation de string pour l'ID pour simplifier
  last_name: string;
  first_name: string;
  age: number;
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
  }, []);

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  // You can add a similar function for handling user modification

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
      <h1 className="mb-4 text-center user-list-title">Users List</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {users.map((user) => (
          <Col key={user._id}>
            <Card className="user-card">
              <Card.Body>
                <Card.Title>{`${user.last_name} ${user.first_name}`}</Card.Title>
                <Card.Text>{`Age: ${user.age}`}</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                {/* Add a button for user modification */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserCard;
