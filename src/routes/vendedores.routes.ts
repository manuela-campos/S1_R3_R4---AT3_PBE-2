import { Router } from "express";
import { VendedoresController } from "../controllers/vendedores.controller";


const vendedoresController = new VendedoresController();
const vendedoresRoutes = Router();

// vendedoresRoutes.get('/vendedores', vendedoresController.selecionarTodos);
vendedoresRoutes.get('/vendedores', vendedoresController.selecionarTodosFormatado);
// vendedoresRoutes.get('/vendedores/:id', vendedoresController.selecionarId);
vendedoresRoutes.get('/vendedor/:idFormatado', vendedoresController.selecionarIdFormatado)
vendedoresRoutes.post('/vendedores', vendedoresController.criar);
vendedoresRoutes.patch('/vendedores', vendedoresController.editar);
vendedoresRoutes.delete('/vendedores', vendedoresController.excluir)

export default vendedoresRoutes;