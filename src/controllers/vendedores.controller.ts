import { Request, Response } from "express";
import { VendedoresService } from "../services/vendedores.services"; 

export class VendedoresController{
    constructor (private _service = new VendedoresService()){}

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
            const {nomeVendedor, cargo} = req.body;
            const novo = await this._service.criarVendedores(nomeVendedor, cargo);
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
            const {nomeVendedor, cargo} = req.body;
            const idVendedor = Number(req.query.idVendedor)
            const alterado = await this._service.editarVendedores(nomeVendedor,cargo, idVendedor);
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
            const idVendedor = Number(req.query.idVendedor)
            const exclusao = await this._service.excluirVendedores(idVendedor);
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
      const vendedoresFormatadas = await this._service.selecionarTodosFormatado();
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Lista de vendedores formatada",
        quantidade: vendedoresFormatadas.length,
        dados: vendedoresFormatadas
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
      const idVendedores = Number(req.params.idVendedor);
      
      // Chama o novo método do Service
      const vendedoresFormatada = await this._service.selecionarIdFormatado(idVendedores);
      
      // Se não encontrou
      if (!vendedoresFormatada) {
        return res.status(404).json({ 
          message: 'Vendedor não encontrado' 
        });
      }
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Vendedor encontrado",
        dados: vendedoresFormatada
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