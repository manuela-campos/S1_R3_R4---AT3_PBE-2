import { Pedidos } from "../models/pedidos.model";
import { PedidosRepository } from "../repository/pedido.repository";

export class PedidosService {
  constructor(private _repository = new PedidosRepository()) {}

  async criarPedidos(idCliente:number, idVendedor:number, valorTotal: number,
    statusPedido: string) {
    const pedidos = Pedidos.criarPedidos(idCliente, idVendedor, valorTotal, statusPedido);
    return await this._repository.create(pedidos);
  }
  async editarPedidos(idCliente:number, idVendedor:number, valorTotal: number,
    statusPedido: string, idPedido:number) {
    const pedidos = Pedidos.editarPedidos(
      idCliente,
      idVendedor,
      valorTotal,
      statusPedido,
      idPedido
    );
    return await this._repository.update(idPedido, pedidos);
  }
  async excluirPedidos(idPedido: number) {
    return await this._repository.delete(idPedido);
  }
    /**
   * Busca todos os pedidos e retorna formatadas com mostrarDados()
   */
  async selecionarTodosFormatado(): Promise<string[]> {
    // Busca no banco que vem como array de objetos simples
    const pedidosDoBanco = await this._repository.findAll();
    
    // Para cada pedido que tem no banco:
    return pedidosDoBanco.map((row: any) => {
      // Vai ser criado uma instância da classe Pedidos
      const pedidos= new Pedidos(row.idCliente, row.idVendedor, row.valorTotal, row.statusPedido, row.idPedido);
      
      // Chama o método mostrarDados() dessa instância
      return pedidos.mostrarDados();
    });
  }

  /**
   * Busca um clientea por ID e retorna formatada com mostrarDados()
   */
  async selecionarIdFormatado(idPedido: number): Promise<string | null> {
    // Faz uma busca no banco
    const rows = await this._repository.selectById(idPedido);
    
    // Se não achou, retorna null
    if (rows.length === 0) return null;
    
    // Pega a primeira (e única) pedido encontrada
    const row = rows[0];
    
    // Cria INSTÂNCIA e chama mostrarDados()
    const pedidos = new Pedidos(row.idCliente, row.idVendedor, row.valorTotal, row.statusPedido, row.idPedido);
    return pedidos.mostrarDados();
  }

}