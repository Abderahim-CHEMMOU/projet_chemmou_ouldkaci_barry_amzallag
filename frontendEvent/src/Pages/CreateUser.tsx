import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    age: 0,
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }
      console.log('Utilisateur créé avec succès!');
      // Réinitialiser le formulaire après la création réussie de l'utilisateur
      resetForm();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      last_name: '',
      first_name: '',
      age: 0,
      email: '',
      password: ''
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="last_name">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="first_name">
        <Form.Label>Prénom</Form.Label>
        <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="age">
        <Form.Label>Âge</Form.Label>
        <Form.Control type="number" name="age" value={formData.age} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Créer l'utilisateur
      </Button>
    </Form>
  );
};

export default CreateUser;
