import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export type EventSearchParams = {
    type?: string;
    startDate?: Date;
    // Ajoutez d'autres paramètres de recherche au besoin
};

const EventSearch: React.FC<{ onSearch: (searchParams: EventSearchParams) => void }> = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState<EventSearchParams>({});

    const handleSearch = () => {
        // Appel de la fonction de recherche avec les paramètres actuels
        onSearch(searchParams);
    };

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ ...searchParams, type: event.target.value });
    };

    const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ ...searchParams, startDate: new Date(event.target.value) });
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formEventType">
                <Form.Label>Type:</Form.Label>
                <Form.Control type="text" placeholder="Enter event type" onChange={handleChangeType} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEventStartDate">
                <Form.Label>Start Date:</Form.Label>
                <Form.Control type="date" onChange={handleChangeStartDate} />
            </Form.Group>

            <Button variant="primary" onClick={handleSearch}>
                Search
            </Button>
        </Form>
    );
};

export default EventSearch;
