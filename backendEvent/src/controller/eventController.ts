import { Request, Response } from "express";
import { Event } from "../models/event";

class EventController {

  /**
   * Mise à jour d'un événement
   * @param req
   * @param res
   */
  update = async (req: Request, res: Response) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedEvent) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error("Erreur de mise à jour de l'événement :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };

}

export const eventController = Object.freeze(new EventController());
