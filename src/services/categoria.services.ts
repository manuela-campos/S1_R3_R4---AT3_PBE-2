import { CategoriasRepository } from "../repository/categorias.repository";
import { Categorias } from "../models/categorias.model";
import { log } from "console";

export class CategoriaService {
  constructor(private _repository = new CategoriasRepository()) {}

  async criar(descricaoCategoria: string) {
    const categoria = Categorias.criar(descricaoCategoria);
    return await this._repository.create(categoria);
  }
  async editar(descricaoCategoria: string, idCategoria: number) {
    const categoria = Categorias.editar(
      descricaoCategoria,
      idCategoria,
    );
    return await this._repository.update(idCategoria, categoria);
  }
  async excluir(idCategoria: number) {
    return await this._repository.delete(idCategoria);
  }
    /**
   * Busca todas as categorias e retorna formatadas com mostrarDados()
   */
  async selecionarTodosFormatado(): Promise<string[]> {
    // Busca no banco que vem como array de objetos simples
    const categoriasDoBanco = await this._repository.findAll();
    
    // Para cada categoria que tem no banco:
    return categoriasDoBanco.map((row: any) => {
      // Vai ser criado uma instância da classe Categorias
      const categoria = new Categorias(row.descricaoCategoria, row.idCategoria);
      
      // Chama o método mostrarDados() dessa instância
      return categoria.mostrarDados();
    });
  }

  /**
   * Busca uma categoria por ID e retorna formatada com mostrarDados()
   */
  async selecionarIdFormatado(idCategoria: number): Promise<string | null> {
    // Faz uma busca no banco
    const rows = await this._repository.selectById(idCategoria);
    
    // Se não achou, retorna null
    if (rows.length === 0) return null;
    
    // Pega a primeira (e única) categoria encontrada
    const row = rows[0];
    
    // Cria INSTÂNCIA e chama mostrarDados()
    const categoria = new Categorias(row.descricaoCategoria, row.idCategoria);
    return categoria.mostrarDados();
  }

}