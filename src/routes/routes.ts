import { Router } from "express";
import categoriasRoutes from "./categorias.routes";
import produtosRoutes from "./produtos.routes"
import clientesRoutes from "./clientes.routes";
import pedidosRoutes from "./pedidos.routes";
import vendedoresRoutes from "./vendedores.routes";
// import professorRoutes from "./professor.routes"

const router = Router();

router.use('/', categoriasRoutes);
router.use('/', produtosRoutes);
router.use('/', clientesRoutes);
router.use('/', vendedoresRoutes);
router.use('/', pedidosRoutes);



export default router;