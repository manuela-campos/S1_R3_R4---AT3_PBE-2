import { Request, Response } from "express";
import { ProdutosRepository } from "../repository/produtos.repository"; 
import { ProdutosService } from "../services/produtos.services";

export class ProdutosController{
    constructor (private _service = new ProdutosService()){}

    // selecionarTodos = async (req: Request, res:Response) => {
    //     try {
    //         const categorias = await this._service.selecionarTodos();
    //         res.status(200).json({categorias})
    //     } catch (error: unknown) {
    //         console.error(error);
    //         if(error instanceof Error){
    //             return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
    //         }
    //         res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'});
    //     }
    // }
    // selecionarId = async (req: Request, res:Response) => {
    //     try {
    //         const idCategoria = Number(req.params.idCategoria);
    //         console.log(idCategoria);
    //         const consulta = await this._service.selecionarId(idCategoria);
    //         console.log(consulta)
    //         res.status(200).json({consulta})
    //     } catch (error: unknown) {
    //         console.error(error);
    //         if(error instanceof Error){
    //             return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
    //         }
    //         res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'});
    //     }
    // }

    criar = async (req: Request, res:Response) => {
        try {
            const {nomeProduto, valorProduto, vinculoImagem, idCategoria} = req.body;
            const novo = await this._service.criarProd(nomeProduto, valorProduto, vinculoImagem, idCategoria);
            res.status(201).json({novo})
        } catch (error: unknown) {
            console.error(error);
            if(error instanceof Error){
                return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
            }
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'});
        }
    }

    editar = async (req: Request, res:Response) => {
        try {
            const {nomeProduto, valorProduto, vinculoImagem, idCategoria} = req.body;
            const idProduto = Number(req.query.idProduto)
            const alterado = await this._service.editarProd(nomeProduto, valorProduto, vinculoImagem,idCategoria, idProduto);
            res.status(200).json({alterado})
        } catch (error: unknown) {
            console.error(error);
            if(error instanceof Error){
                return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
            }
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'});
        }
    }

    excluir = async (req: Request, res:Response) => {
        try {
    //         // const {idCategoria} = req.params;
            const idProduto = Number(req.query.idProduto)
            const exclusao = await this._service.excluir(idProduto);
            res.status(200).json({exclusao})
        } catch (error: unknown) {
            console.error(error);
            if(error instanceof Error){
                return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
            }
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'});
        }
    }
      /**
   * Retorna todas as categorias usando o método mostrarDados() do Model
   */
  selecionarTodosFormatado = async (req: Request, res: Response) => {
    try {
      // Chama o novo método do Service
      const produtosFormatadas = await this._service.selecionarTodosFormatado();
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Lista de produtos formatada",
        quantidade: produtosFormatadas.length,
        dados: produtosFormatadas
      });
      
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({ 
          message: 'Ocorreu um erro no servidor', 
          errorMessage: error.message 
        });
      }
      res.status(500).json({ 
        message: 'Ocorreu um erro no servidor', 
        errorMessage: 'Erro desconhecido' 
      });
    }
  }
    /**
   * Retorna uma categoria usando o método mostrarDados() do Model
   */
  selecionarIdFormatado = async (req: Request, res: Response) => {
    try {
      const idProduto = Number(req.params.idProduto);
      
      // Chama o novo método do Service
      const produtoFormatada = await this._service.selecionarIdFormatado(idProduto);
      
      // Se não encontrou
      if (!produtoFormatada) {
        return res.status(404).json({ 
          message: 'Produto não encontrado' 
        });
      }
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Produto encontrado",
        dados: produtoFormatada
      });
      
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({ 
          message: 'Ocorreu um erro no servidor', 
          errorMessage: error.message 
        });
      }
      res.status(500).json({ 
        message: 'Ocorreu um erro no servidor', 
        errorMessage: 'Erro desconhecido' 
      });
    }
  }
}