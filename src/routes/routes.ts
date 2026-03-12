import { Router } from "express";
import categoriaRoutes from "./categorias.routes";
// import professorRoutes from "./professor.routes"

const router = Router();

router.use('/', categoriaRoutes);
// router.use('/', professorRoutes);



export default router;