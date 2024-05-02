
import cors from "cors";
import express from "express";
import { setMongoConnection } from "./config/mongo.config";
import { setEventRouting } from "./routes/eventRoutes";
import { setUserRouting } from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use(cors());

const port = 8080;

setMongoConnection();

setUserRouting(app);
setEventRouting(app);

app.listen(port, () => {
  console.log(`serveur en écoute sur le port : ${port}`);
});
