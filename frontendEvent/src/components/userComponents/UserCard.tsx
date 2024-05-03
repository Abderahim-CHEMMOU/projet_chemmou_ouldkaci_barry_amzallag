import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "../../styles/user.css";

type User = {
  _id: string;
  last_name: string;
  first_name: string;
  age: number;
};

const UserCard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modifiedUser, setModifiedUser] = useState<User | null>(null);

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
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModifiedUser((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${modifiedUser!._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedUser),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      // Mettre à jour l'utilisateur dans la liste
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === modifiedUser!._id ? modifiedUser! : user
        )
      );
      setModifiedUser(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update user");
    }
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
      <h1 className="mb-4 text-center user-list-title">Users List</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {users.map((user) => (
          <Col key={user._id}>
            <Card className="user-card">
              <Card.Body>
                {modifiedUser && modifiedUser._id === user._id ? (
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={modifiedUser.last_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                ) : (
                  <Card.Title>{`${user.last_name} ${user.first_name}`}</Card.Title>
                )}
                {modifiedUser && modifiedUser._id === user._id ? (
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={modifiedUser.first_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                ) : null}
                {modifiedUser && modifiedUser._id === user._id ? (
                  <Form.Group controlId="formAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={modifiedUser.age}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                ) : (
                  <Card.Text>{`Age: ${user.age}`}</Card.Text>
                )}
                {modifiedUser && modifiedUser._id === user._id ? (
                  <Button className="mr-2" variant="success" onClick={handleSubmit}>Submit</Button>
                ) : (
                  <Button className="mr-2" variant="primary" onClick={() => setModifiedUser(user)}>Edit</Button>
                )}
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserCard;
