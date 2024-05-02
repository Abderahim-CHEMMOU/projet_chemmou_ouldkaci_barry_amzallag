import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: new Date().toISOString().slice(0, 16),
    end_date: new Date().toISOString().slice(0, 16),
    location: '',
    image: '',
    links: [{ title: '', url: '' }],
    type: 'conférence',
    max_participants: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLinkTitleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newLinks = [...formData.links];
    newLinks[index].title = e.target.value;
    setFormData({
      ...formData,
      links: newLinks
    });
  };

  const handleLinkUrlChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newLinks = [...formData.links];
    newLinks[index].url = e.target.value;
    setFormData({
      ...formData,
      links: newLinks
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/events/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'événement');
      }
      console.log('Événement créé avec succès!');
      handleCloseModal();
      window.location.href = "/home"
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { title: '', url: '' }]
    });
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <h1>Créer un événement</h1>
          <Button variant="primary" onClick={handleShowModal}>
            Créer un événement
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un événement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Titre</Form.Label>
              <Form.Control type="text" placeholder="Titre" name="title" value={formData.title} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Description" name="description" value={formData.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="start_date">
              <Form.Label>Date de début</Form.Label>
              <Form.Control type="datetime-local" name="start_date" value={formData.start_date} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="end_date">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control type="datetime-local" name="end_date" value={formData.end_date} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Lieu</Form.Label>
              <Form.Control type="text" placeholder="Lieu" name="location" value={formData.location} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Image" name="image" value={formData.image} onChange={handleInputChange} />
            </Form.Group>

            {formData.links.map((link, index) => (
              <div className="mb-3" key={index}>
                <Form.Group controlId={`linkTitle${index}`}>
                  <Form.Label>Titre du lien</Form.Label>
                  <Form.Control type="text" placeholder="Titre du lien" value={link.title} onChange={(e) => handleLinkTitleChange(e as React.ChangeEvent<HTMLInputElement>, index)} />
                </Form.Group>
                <Form.Group controlId={`linkUrl${index}`}>
                  <Form.Label>URL du lien</Form.Label>
                  <Form.Control type="text" placeholder="URL du lien" value={link.url} onChange={(e) => handleLinkUrlChange(e as React.ChangeEvent<HTMLInputElement>, index)} />
                </Form.Group>
              </div>
            ))}

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="conférence">Conférence</option>
                <option value="concert">Concert</option>
                <option value="réunion privée">Réunion privée</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="max_participants">
              <Form.Label>Nombre maximum de participants</Form.Label>
              <Form.Control type="number" placeholder="Nombre maximum de participants" name="max_participants" value={formData.max_participants} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Créer
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateEvent;
