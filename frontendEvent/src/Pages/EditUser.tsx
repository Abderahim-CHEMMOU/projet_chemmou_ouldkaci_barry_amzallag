import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const EditUser: React.FC = () => {
  const [userData, setUserData] = useState({
    last_name: '',
    first_name: '',
    age: 0,
    email: '',
    password: ''
  });

  // Charge les détails de l'utilisateur à modifier lors du montage du composant
  useEffect(() => {
    // Logique pour récupérer les détails de l'utilisateur à modifier depuis le serveur
    // Met à jour l'état userData avec les détails récupérés
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users/:id', {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la modification de l\'utilisateur');
      }
      console.log('Utilisateur modifié avec succès!');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Afficher les champs pré-remplis avec les détails de l'utilisateur */}
      <Form.Group controlId="last_name">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" name="last_name" value={userData.last_name} onChange={handleInputChange} required />
      </Form.Group>
      {/* Ajoutez d'autres champs pour les autres détails de l'utilisateur */}
      <Button variant="primary" type="submit">
        Enregistrer les modifications
      </Button>
    </Form>
  );
};

export default EditUser;
