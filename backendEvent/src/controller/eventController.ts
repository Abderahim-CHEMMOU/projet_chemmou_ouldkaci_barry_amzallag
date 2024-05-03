import { Request, Response, NextFunction } from "express";
import { Event, eventJoiSchema } from "../models/event";
import { User} from "../models/user";

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


    /**
 * Récupère tous les événements avec leur note moyenne.
 * @param req Requête HTTP.
 * @param res Réponse HTTP.
 * @param next Middleware suivant.
 */

findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupère tous les événements depuis la base de données
    const events = await Event.find();

    // Ajoute le champ average_rating à chaque événement
    const eventsWithAverageRating = events.map(event => ({
      ...event.toObject(),
      average_rating: this.calculateAverageRating(event)
    }));

    // Renvoie les événements avec leur note moyenne
    res.status(200).json(eventsWithAverageRating);
  } catch (error) {
    // Gère les erreurs et renvoie une réponse d'erreur appropriée
    this.handleError(res, error);
  }
};


/**
 * Récupère un événement par son ID avec sa note moyenne.
 * @param req Requête HTTP.
 * @param res Réponse HTTP.
 * @param next Middleware suivant.
 */

findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupère l'événement depuis la base de données par son ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      // Si l'événement n'est pas trouvé, renvoie une réponse 404
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    // Ajoute le champ average_rating à l'événement trouvé
    const eventWithAverageRating = {
      ...event.toObject(),
      average_rating: this.calculateAverageRating(event)
    };

    // Renvoie l'événement avec sa note moyenne
    res.status(200).json(eventWithAverageRating);
  } catch (error) {
    // Gère les erreurs et renvoie une réponse d'erreur appropriée
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
        const validationResult = eventJoiSchema.validate(req.body);
        if (validationResult.error) {
          return res.status(400).json({ message: validationResult.error.details[0].message });
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
  }
 
    /**
   * un utilisateur Participe à un évenement
   * @param req Requête contenant l'ID de l'événement et de l'utilisateur à ajouter
   * @param res Réponse renvoyée au client
   * @param next Middleware suivant à appeler
   */
    participate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = req.params.id;
      const userId = req.params.userId;

      // Vérifie si l'événement existe dans la base de données
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }

      // Vérifie si l'utilisateur existe dans la base de données
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur n'existe pas dans la base de données" });
      }

      // Vérifie si l'utilisateur existe déjà dans la liste des participants
      const existingParticipant = event.participants.find(participant => participant.user_id.toString() === userId);
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

      /**
     * Supprime un participant de la liste des participants d'un événement
     * @param req Requête contenant l'ID de l'événement et de l'utilisateur à supprimer
     * @param res Réponse renvoyée au client
     * @param next Middleware suivant à appeler
     */
      removeParticipant = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const eventId = req.params.id;
            const userId = req.params.userId;

            // Vérifie si l'événement existe dans la base de données
            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: "Événement non trouvé" });
            }

            // Vérifie si l'utilisateur existe déjà dans la liste des participants
            const participantIndex = event.participants.findIndex(participant => participant.user_id.toString() === userId);
            if (participantIndex === -1) {
                return res.status(404).json({ message: "L'utilisateur n'est pas un participant de cet événement" });
            }


            // Supprime l'utilisateur de la liste des participants de l'événement
            event.participants.splice(participantIndex, 1);

            // Sauvegarde les modifications
            await event.save();


            res.status(200).json({ message: "Utilisateur supprimé de la liste des participants avec succès" });
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur de la liste des participants :", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    };

    /**
   * Calcul du nombre de places restantes dans un événement
   * @param req Requête HTTP
   * @param res Réponse HTTP
   * @param next Middleware suivant
   */
  calculateRemainingSeats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = req.params.id;


      // Trouver l'événement par son ID
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }

      // Calculer le nombre de places restantes
      const remainingSeats = event.max_participants - event.participants.length;


      res.status(200).json({ remainingSeats });
    } catch (error) {
      console.error("Erreur lors du calcul des places restantes :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Noter un événement après sa fin
   * @param req Requête HTTP
   * @param res Réponse HTTP
   * @param next Middleware suivant
   */
  rateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = req.params.id; // Récupérer l'ID de l'événement depuis les paramètres de la requête
      const userId = req.params.userId; // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
      const { rating } = req.body; // Récupérer la note

      
      // Vérifier que la note est dans la plage autorisée (1 à 5)
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 1 et 5" });
      }


      // Trouver l'événement par son ID
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }


      // Vérifier si la date de fin de l'événement est antérieure à la date actuelle
      const currentDate = new Date();
      console.log("date et heure actuel: ", currentDate);
      console.log("date et heure de fin d'event: ", event.end_date);


      if (event.end_date > currentDate) {
        return res.status(400).json({ message: "Vous ne pouvez pas encore noter cet événement que après ça fin" });
      }

      // Trouver le participant dans la liste des participants de l'événement
      const participant = event.participants.find((participant) => participant.user_id.toString() === userId);

      if (!participant) {
        return res.status(404).json({ message: "Vous êtes pas participez à cet événement" });
      }

      // Mettre à jour la note du participant
      participant.rating = rating;

      // Sauvegarder les modifications
      await event.save();

      return res.status(200).json({ message: "Votre note a été enregistrée avec succès" });
    } catch (error) {
      console.error("Erreur lors de la notation de l'événement :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
}
 
export const eventController = Object.freeze(new EventController());