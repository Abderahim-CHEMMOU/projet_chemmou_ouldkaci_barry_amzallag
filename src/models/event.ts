import mongoose from "mongoose";
import Joi from "joi";


const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  start_date: Date,
  end_date: Date,
  location: String,
  image: String,
  participants: [{ user_id: mongoose.Types.ObjectId, rating: { type: Number, default: 0 } }],
  links: [{ title: String, url: String }],
  type: { type: String, enum: ["conférence", "concert", "réunion privée"] },
  max_participants: Number
});


export const Event = mongoose.model("Event", eventSchema);

export const eventJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  location: Joi.string().required(),
  image: Joi.string(),
  participants: Joi.array().items(Joi.object({
    user_id: Joi.string().required(),
    rating: Joi.number().min(0).max(5) //  la note est comprise entre 0 et 5
  })),
  links: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required().uri() // Vérification que l'URL est valide
  })),
  type: Joi.string().valid("conférence", "concert", "réunion privée").required(),
  max_participants: Joi.number().integer().min(0)
});
