import { Router } from "express";
import { ProdutosController } from "../controllers/produtos.controller";
import uploadImage from "../middlewares/produtos.middlewares";

const produtosController = new ProdutosController();
const produtoRoutes = Router();

// produtoRoutes.get('/produtos', produtosController.selecionarTodos);
produtoRoutes.get('/produtos', produtosController.selecionarTodosFormatado);
// produtoRoutes.get('/produtos/:id', produtosController.selecionarId);
produtoRoutes.get('/produto/:idFormatado', produtosController.selecionarIdFormatado)
produtoRoutes.post('/produtos', uploadImage, produtosController.criar);
produtoRoutes.patch('/produtos', produtosController.editar);
produtoRoutes.delete('/produtos', produtosController.excluir)

export default produtoRoutes;