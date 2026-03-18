import { ItensPedidosRepository } from "../repository/itensPedidos.repository";
import { ItensPedidos } from "../models/itensPedidos.model";
import { log } from "console";

export class ItensPedidosService {
  constructor(private _repository = new ItensPedidosRepository()) {}

  async criar(
    // idPedido: number,
    // idProduto: number,
    quantidade: number,
    valorUnidade: number,
  ) {
    const item = ItensPedidos.criarItensPedidos(
      // idPedido,
      // idProduto,
      quantidade,
      valorUnidade,
    );
    return await this._repository.create(item);
  }
  async editar(
    // idPedido: number,
    // idProduto: number,
    quantidade: number,
    valorUnidade: number,
    idItem: number,
  ) {
    const item = ItensPedidos.editarItensPedidos(quantidade,valorUnidade, idItem);
    return await this._repository.update(idItem, item);
  }
  async excluir(idItem: number) {
    return await this._repository.delete(idItem);
  }
  /**
   * Busca todas as ItensPedidos e retorna formatadas com mostrarDados()
   */
  async selecionarTodosFormatado(): Promise<number[]> {
    // Busca no banco que vem como array de objetos simples
    const itemDoBanco = await this._repository.findAll();

    // Para cada item que tem no banco:
    return itemDoBanco.map((row: any) => {
      // Vai ser criado uma instância da classe ItensPedidos
      const item = new ItensPedidos( row.quantidade, row.valorUnidade, row.idItem);

      // Chama o método mostrarDados() dessa instância
      return item.mostrarDados();
    });
  }

  /**
   * Busca uma item por ID e retorna formatada com mostrarDados()
   */
  async selecionarIdFormatado(idItem: number): Promise<number | null> {
    // Faz uma busca no banco
    const rows = await this._repository.selectById(idItem);

    // Se não achou, retorna null
    if (rows.length === 0) return null;

    // Pega a primeira (e única) item encontrada
    const row = rows[0];

    // Cria INSTÂNCIA e chama mostrarDados()
    const item = new ItensPedidos(row.quantidade, row.valorUnidade, row.idItem);
    return item.mostrarDados();
  }
}
