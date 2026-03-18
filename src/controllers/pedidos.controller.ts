import { Request, Response } from "express";
import { PedidosService } from "../services/pedido.services";

export class PedidosController{
    constructor (private _service = new PedidosService()){}

    criar = async (req: Request, res:Response) => {
        try {
            const {idCliente, idVendedor, valorTotal, statusPedido} = req.body;
            const novo = await this._service.criarPedidos(idCliente, idVendedor, valorTotal, statusPedido);
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
            const {idCliente, idVendedor, valorTotal, statusPedido} = req.body;
            const idPedido = Number(req.query.idPedido)
            const alterado = await this._service.editarPedidos(idCliente, idVendedor, valorTotal,statusPedido, idPedido);
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
            const idPedido = Number(req.query.idPedido)
            const exclusao = await this._service.excluirPedidos(idPedido);
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
   * Retorna todas os pedidos usando o método mostrarDados() do Model
   */
  selecionarTodosFormatado = async (req: Request, res: Response) => {
    try {
      // Chama o novo método do Service
      const pedidosFormatados = await this._service.selecionarTodosFormatado();
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Lista de pedidos formatada",
        quantidade: pedidosFormatados.length,
        dados: pedidosFormatados
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
      const idPedidos = Number(req.params.idPedidos);
      
      // Chama o novo método do Service
      const pedidosFormatados = await this._service.selecionarIdFormatado(idPedidos);
      
      // Se não encontrou
      if (!pedidosFormatados) {
        return res.status(404).json({ 
          message: 'Pedidos não encontrados' 
        });
      }
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Pedidos encontrados",
        dados: pedidosFormatados
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