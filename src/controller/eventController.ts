import { Request, Response, NextFunction } from "express";
import { Event, eventJoiSchema } from "../models/event";
 
class EventController {
  /**
   * Permet de récupérer la liste des événements
   * @param req
   * @param res
   * @param next
   */
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
 
  /**
   * Récupération d'un événement par son ID
   * @param req
   * @param res
   * @param next
   */
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }
      res.status(200).json(event);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'événement :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
 
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