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
  start_date: Joi.date().min('now').required(), // start_date doit être supérieur ou égal à la date courante
  end_date: Joi.date().min(Joi.ref('start_date', { adjust: (value) => new Date(value)
    .getTime() + 30 * 60 * 1000 }))
    .required().messages({
      "date.min": "\"end_date\" doit être supérieur de 30 minutes à \"ref:start_date\""
    }),
  location: Joi.string().required(),
  image: Joi.string(),
  participants: Joi.array().items(Joi.object({
    user_id: Joi.string().required(),
    rating: Joi.number().min(0).max(5)
  })),
  links: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required().uri()
  })),
  type: Joi.string().valid("conférence", "concert", "réunion privée").required(),
  max_participants: Joi.number().integer().min(0)
});

