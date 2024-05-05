import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

class UserController {
  /**
   * Permet de récupérer la liste des utilisateurs
   * @param req
   * @param res
   * @param next
   */
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Récupération d'un utilisateur par son ID
   * @param req
   * @param res
   * @param next
   */
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Création d'un utilisateur
   * @param req
   * @param res
   * @param next
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Mise à jour d'un utilisateur
   * @param req
   * @param res
   * @param next
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Suppression d'un utilisateur
   * @param req
   * @param res
   * @param next
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(deletedUser);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
}

export const userController = Object.freeze(new UserController());
