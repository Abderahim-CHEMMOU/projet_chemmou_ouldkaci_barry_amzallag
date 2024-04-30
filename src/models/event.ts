import mongoose from "mongoose";
import Joi from "joi";

const eventSchema = new mongoose.Schema({
    titre: String,
    description: String,
    date_debut: Date,
    date_fin: Date,
    location: String,
    image: String,
    participants: [{ user_id: mongoose.Types.ObjectId, rating: Number }],
    average_rating: Number,
    links: [{ titre: String, url: String }],
    type: { type: String, enum: ["conférence", "concert", "réunion privée"] },
    max_participants: Number
});

export const Event = mongoose.model("Event", eventSchema);

export const eventJoiSchema = Joi.object({
  titre: Joi.string().required(),
  description: Joi.string().required(),
  date_debut: Joi.date().required(),
  date_fin: Joi.date().required(),
  location: Joi.string().required(),
  image: Joi.string(),
  participants: Joi.array().items(Joi.object({
    user_id: Joi.string().required(),
    rating: Joi.number().min(0).max(5) //  la note est comprise entre 0 et 5
  })),
  average_rating: Joi.number(),
  links: Joi.array().items(Joi.object({
    titre: Joi.string().required(),
    url: Joi.string().required().uri() // Vérification que l'URL est valide
  })),
  type: Joi.string().valid("conférence", "concert", "réunion privée").required(),
  max_participants: Joi.number().integer().min(0)
});
