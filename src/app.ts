import express from "express";

import { setUserRouting } from "./routes/userRoutes";
import { setMongoConnection } from "./config/mongo.config";
import { setEventRouting } from "./routes/eventRoutes";

const app = express();
app.use(express.json());
const port = 8080;

setMongoConnection();

setUserRouting(app);
setEventRouting(app);

app.listen(port, () => {
  console.log(`serveur en écoute sur le port : ${port}`);
});
