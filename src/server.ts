import express from "express";
import { EnvVar } from "./config/EnvVar";
import router from "./routes/routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(EnvVar.SERVER_PORT, () => {
  console.log(`Servidor rodando em https://localhost:${EnvVar.SERVER_PORT}`);
});
