import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type EventSearchParams = {
    type: string;
    endDate: string;
};

type EventSearchProps = {
    onSearch: (searchParams: EventSearchParams) => void;
};

const EventSearch: React.FC<EventSearchProps> = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState<EventSearchParams>({
        type: "",
        endDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Select
                    as="select"
                    name="type"
                    onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                >
                    <option value="">Tous</option>
                    <option value="conférence">Conférence</option>
                    <option value="concert">Concert</option>
                    <option value="réunion privée">Réunion privée</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="formEndDate">
                <Form.Label>Date de fin</Form.Label>
                <Form.Control
                    type="date"
                    name="endDate"
                    onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Rechercher
            </Button>
        </Form>
    );
};

export default EventSearch;
