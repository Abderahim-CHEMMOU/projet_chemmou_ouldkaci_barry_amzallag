import mongoose from "mongoose";

export default class Event {
    // 1. Typage des propiétés d'un pokémon.
    // id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    location: string;
    image?: string;
    participants: [{ user_id: number; rating: number }];
    average_rating?: number;
    links?: [{ title: string; url: string }];
    type?: { type: string; enum: ["conférence", "concert", "réunion privée"] };
    max_participants?: number;

    // 2. Définition des valeurs par défaut des propriétés d'un pokémon.
    constructor(
        title: string,
        description: string,
        start_date: Date,
        end_date: Date,
        location: string,
        participants: { user_id: mongoose.Types.ObjectId; rating: number }[],
        image?: string,
        links?: { title: string; url: string }[],
        type?: { type: string; enum: ["conférence", "concert", "réunion privée"] },
        max_participants?: number
    ) {
        // this.id = new mongoose.Types.ObjectId();
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.location = location;
        this.participants = participants;
        this.image = image;
        this.links = links;
        this.type = type;
        this.max_participants = max_participants;
    }
  }