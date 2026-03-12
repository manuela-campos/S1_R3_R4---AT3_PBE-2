import { CategoriasRepository } from "../repository/categorias.repository";
import { Categorias } from "../models/categorias.model";
import { log } from "console";

export class CategoriaService {
  constructor(private _repository = new CategoriasRepository()) {}
  // Vai chamar o repositório, executar a findAll e retorna as categorias do banco
  async selecionarTodos() {
    return await this._repository.findAll();
  }
  async selecionarId(idCategoria: number) {
    return await this._repository.selectById(idCategoria);
  }

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
}
