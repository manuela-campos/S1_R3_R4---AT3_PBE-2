import { Router } from "express";
import { PedidosController } from "../controllers/pedidos.controller";


const pedidosController = new PedidosController();
const pedidosRoutes = Router();

// pedidosRoutes.get('/pedidos', pedidosController.selecionarTodos);
pedidosRoutes.get('/pedidos', pedidosController.selecionarTodosFormatado);
// pedidosRoutes.get('/pedidos/:id', pedidosController.selecionarId);
pedidosRoutes.get('/pedido/:idFormatado', pedidosController.selecionarIdFormatado)
pedidosRoutes.post('/pedidos', pedidosController.criar);
pedidosRoutes.patch('/pedidos', pedidosController.editar);
pedidosRoutes.delete('/pedidos', pedidosController.excluir)

export default pedidosRoutes;