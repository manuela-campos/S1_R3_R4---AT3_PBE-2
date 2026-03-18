import { Request, Response } from "express";
import { ClientesService } from "../services/clientes.services";

export class ClientesController{
    constructor (private _service = new ClientesService()){}

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
            const {nomeCliente, email} = req.body;
            const novo = await this._service.criarClientes(nomeCliente, email);
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
            const {nomeCliente, email} = req.body;
            const idCliente = Number(req.query.idCliente)
            const alterado = await this._service.editarClientes(nomeCliente, email, idCliente);
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
            const idCliente = Number(req.query.idCliente)
            const exclusao = await this._service.excluirClientes(idCliente);
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
      const clientesFormatadas = await this._service.selecionarTodosFormatado();
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Lista de produtos formatada",
        quantidade: clientesFormatadas.length,
        dados: clientesFormatadas
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
      const idCliente = Number(req.params.idCliente);
      
      // Chama o novo método do Service
      const clietesFormatada = await this._service.selecionarIdFormatado(idCliente);
      
      // Se não encontrou
      if (!clietesFormatada) {
        return res.status(404).json({ 
          message: 'Cliente não encontrado' 
        });
      }
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Cliente encontrado",
        dados: clietesFormatada
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