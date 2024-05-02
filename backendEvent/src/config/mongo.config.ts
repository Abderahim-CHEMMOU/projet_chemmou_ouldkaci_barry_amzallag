import mongoose from "mongoose";

/**
 * Fonction permettant de faire la configuration à la connection avec MongoDB
 */
export const setMongoConnection = () => {
  mongoose
    .connect(
      "mongodb://127.0.0.1/application" // Assurez-vous de remplacer par le nom de votre base de données
    )
    .then(() => {
      console.log("Connexion à la base de données réussie");
    })
    .catch((error) => {
      console.error("Erreur de connexion à la base de données:", error);
    });
};
