import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.services"; 

export class CategoriaController{
    constructor (private _service = new CategoriaService()){}

    selecionarTodos = async (req: Request, res:Response) => {
        try {
            const categorias = await this._service.selecionarTodos();
            res.status(200).json({categorias})
        } catch (error: unknown) {
            console.error(error);
            if(error instanceof Error){
                return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
            }
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'});
        }
    }
    selecionarId = async (req: Request, res:Response) => {
        try {
            const idCategoria = Number(req.params.idCategoria);
            console.log(idCategoria);
            const consulta = await this._service.selecionarId(idCategoria);
            console.log(consulta)
            res.status(200).json({consulta})
        } catch (error: unknown) {
            console.error(error);
            if(error instanceof Error){
                return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
            }
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'});
        }
    }

    criar = async (req: Request, res:Response) => {
        try {
            const {descricaoCategoria} = req.body;
            const novo = await this._service.criar(descricaoCategoria);
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
            const {descricaoCategoria} = req.body;
            const idCategoria = Number(req.query.idCategoria)
            const alterado = await this._service.editar(descricaoCategoria, idCategoria);
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
            const idCategoria = Number(req.query.idAluno)
            const exclusao = await this._service.excluir(idCategoria);
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
      const categoriasFormatadas = await this._service.selecionarTodosFormatado();
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Lista de categorias formatada",
        quantidade: categoriasFormatadas.length,
        dados: categoriasFormatadas
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
      const idCategoria = Number(req.params.idCategoria);
      
      // Chama o novo método do Service
      const categoriaFormatada = await this._service.selecionarIdFormatado(idCategoria);
      
      // Se não encontrou
      if (!categoriaFormatada) {
        return res.status(404).json({ 
          message: 'Categoria não encontrada' 
        });
      }
      
      // Retorna para o Insomnia
      res.status(200).json({
        message: "Categoria encontrada",
        dados: categoriaFormatada
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