import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteUser: React.FC = () => {
  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/:id', {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }
      console.log('Utilisateur supprimé avec succès!');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
      <Button variant="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteUser;
