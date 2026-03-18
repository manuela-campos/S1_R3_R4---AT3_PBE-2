import { Request, Response } from "express";
import { ItensPedidosService } from "../services/itensPedidos.services";

export class ItensPedidosController{
    constructor (private _service = new ItensPedidosService()){}

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
            const {quantidade, valorUnidade} = req.body;
            const novo = await this._service.criar(quantidade, valorUnidade);
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
            const {quantidade, valorUnidade} = req.body;
            const idItem = Number(req.query.idItem)
            const alterado = await this._service.editar(quantidade, valorUnidade, idItem);
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
            const idItem = Number(req.query.idItem)
            const exclusao = await this._service.excluir(idItem);
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
      const itemFormatado = await this._service.selecionarTodosFormatado();
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Lista de itens formatados",
        quantidade: itemFormatado.length,
        dados: itemFormatado
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
      const idItem = Number(req.params.idItem);
      
      // Chama o novo método do Service
      const itemFormatado = await this._service.selecionarIdFormatado(idItem);
      
      // Se não encontrou
      if (!itemFormatado) {
        return res.status(404).json({ 
          message: 'Item não encontrado' 
        });
      }
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Item encontrado",
        dados: itemFormatado
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