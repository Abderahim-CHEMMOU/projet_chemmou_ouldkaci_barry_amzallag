import { Request, Response, NextFunction } from "express";
import { Event, eventJoiSchema } from "../models/event";

class EventController {
 

  /**
   * Création d'un événement
   * @param req
   * @param res
   * @param next
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = eventJoiSchema.validate(req.body);
      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }
      const event = await Event.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
}

export const eventController = Object.freeze(new EventController());
