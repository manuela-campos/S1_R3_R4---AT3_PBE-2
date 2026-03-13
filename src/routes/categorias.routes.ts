import { Router } from "express";
import { CategoriaController } from "../controllers/categorias.controller";


const categoriaController = new CategoriaController();
const categoriaRoutes = Router();

categoriaRoutes.get('/categorias', categoriaController.selecionarTodos);
categoriaRoutes.get('/categorias', categoriaController.selecionarTodosFormatado);
categoriaRoutes.get('/categorias/:id', categoriaController.selecionarId);
categoriaRoutes.get('/categorias', categoriaController.selecionarIdFormatado)
categoriaRoutes.post('/categorias', categoriaController.criar);
categoriaRoutes.patch('/categorias', categoriaController.editar);
categoriaRoutes.delete('/categorias', categoriaController.excluir)

export default categoriaRoutes;