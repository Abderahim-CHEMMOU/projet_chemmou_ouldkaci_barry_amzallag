

import { Request, Response, NextFunction } from "express";
import { Event, eventJoiSchema } from "../models/event";
 
// Interface représentant la structure d'un participant dans un événement

interface Participant {
    user_id: string;
    rating: number;
}
  
class EventController {
  
    private handleError(res: Response, error: Error, statusCode = 500, message = "Erreur interne du serveur") {
        console.error("Erreur :", error);
        return res.status(statusCode).json({ error: message });
    }

    /**
     * Calculer la note moyenne d'un événement à partir des notes données par les participants.
     * @param event L'événement pour lequel calculer la note moyenne.
     * @returns La note moyenne de l'événement.
     */
    private calculateAverageRating(event: any): number {
        let totalRating = 0;
        let numParticipantsWithRating = 0;

        // Parcours des participants
        for (const participant of event.participants) {
            // Vérification si une note a été donnée
            if (participant.rating > 0) {
                totalRating += participant.rating;
                numParticipantsWithRating++;
            }
        }

        // Calcul de la note moyenne
        if (numParticipantsWithRating > 0) {
            return totalRating / numParticipantsWithRating;
        } else {
            return 0; // Aucune note donnée, la note moyenne est donc 0
        }
    }

     findAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const events = await Event.find();
        res.status(200).json(events);
      } catch (error) {
        this.handleError(res, error);
      }
    };
  
    /**
   * Récupération d'un événement par son ID
   * @paramreq
   * @paramres
   * @paramnext
   */
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }
      res.status(200).json(event);
    } catch (error) {
      this.handleError(res, error);
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
            this.handleError(res, error);
        }
    };
  
  /**
  * Mise à jour d'un événement
  * @param req
  * @param res
  */

  update = async (req: Request, res: Response, next: NextFunction) => {
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
      this.handleError(res, error);
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
      this.handleError(res, error);
    }

    /**
   * un utilisateur Participer à un évenement 
   * @param req Requête contenant l'ID de l'événement et de l'utilisateur à ajouter
   * @param res Réponse renvoyée au client
   * @param next Middleware suivant à appeler
   */
    participate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = req.params.eventId;
      const userId = req.params.userId;

      // Vérifie si l'événement existe
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }

      // Vérifie si l'utilisateur existe dans le document users 

      // Vérifie si l'utilisateur existe déjà dans la liste des participants
      const existingParticipant = event.participants.find(participant => participant.user_id === userId);
      if (existingParticipant) {
        return res.status(400).json({ message: "L'utilisateur participe déjà à cet événement" });
      }

      // Ajoute l'utilisateur à la liste des participants de l'événement
      event.participants.push({ user_id: userId, rating: 0 });

      // Sauvegarde les modifications
      await event.save();

      res.status(200).json({ message: "Utilisateur ajouté à l'événement avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur à l'événement :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
}
}
 
export const eventController = Object.freeze(new EventController());
