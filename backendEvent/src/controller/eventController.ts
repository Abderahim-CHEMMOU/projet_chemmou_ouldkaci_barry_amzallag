import {​​ Request, Response, NextFunction }​​ from "express";
import {​​ Event, eventJoiSchema }​​ from "../models/event";

class EventController {​​
  /**
   * Permet de récupérer la liste des événements
   * @paramreq
   * @paramres
   * @paramnext
   */
  findAll = async (req: Request, res: Response, next: NextFunction) => {​​
    try {​​
      const events = await Event.find();
      res.status(200).json(events);
    }​​ catch (error) {​​
      console.error("Erreur lors de la récupération des événements :", error);
      res.status(500).json({​​ error: "Erreur interne du serveur" }​​);
    }​​
  }​​;
  /**
   * Récupération d'un événement par son ID
   * @paramreq
   * @paramres
   * @paramnext
   */
  findById = async (req: Request, res: Response, next: NextFunction) => {​​
    try {​​
      const event = await Event.findById(req.params.id);
      if (!event) {​​
        return res.status(404).json({​​ message: "Événement non trouvé" }​​);
      }​​
      res.status(200).json(event);
    }​​ catch (error) {​​
      console.error("Erreur lors de la récupération de l'événement :", error);
      res.status(500).json({​​ error: "Erreur interne du serveur" }​​);
    }​​
  }​​;
}​​
export const eventController = Object.freeze(new EventController())