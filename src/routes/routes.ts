import { Router } from "express";
import categoriasRoutes from "./categorias.routes";
import produtosRoutes from "./produtos.routes"
// import professorRoutes from "./professor.routes"

const router = Router();

router.use('/', categoriasRoutes);
router.use('/', produtosRoutes);



export default router;