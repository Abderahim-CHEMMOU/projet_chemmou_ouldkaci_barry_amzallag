import { Request, Response, NextFunction } from "express";
import { Event, eventJoiSchema } from "../models/event";

class EventController {
 
/**
   * Suppression d'un événement
   * @param req
   * @param res
   * @param next
   */
delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }
      res.status(200).json(deletedEvent);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
  
}

export const eventController = Object.freeze(new EventController());
