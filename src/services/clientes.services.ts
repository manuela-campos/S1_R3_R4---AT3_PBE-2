import { ClientesRepository } from "../repository/clientes.repository";
import { Clientes } from "../models/clientes.model";
import { log } from "console";

export class ClientesService {
  constructor(private _repository = new ClientesRepository()) {}
  // Vai chamar o repositório, executar a findAll e retorna as clientess do banco
  // async selecionarTodos() {
  //   return await this._repository.findAll();
  // }
  // async selecionarId(idCategoria: number) {
  //   return await this._repository.selectById(idCategoria);
  // }

  async criarClientes(nomeCliente: string, email: string) {
    const cliente = Clientes.criarCliente(nomeCliente, email);
    return await this._repository.create(cliente);
  }
  async editarClientes(nomeCliente: string, email: string, idCliente: number) {
    const cliente = Clientes.editarCliente(
      nomeCliente,
      email,
      idCliente,
    );
    return await this._repository.update(idCliente, cliente);
  }
  async excluirClientes(idCliente: number) {
    return await this._repository.delete(idCliente);
  }
    /**
   * Busca todas as categorias e retorna formatadas com mostrarDados()
   */
  async selecionarTodosFormatado(): Promise<string[]> {
    // Busca no banco que vem como array de objetos simples
    const clientesDoBanco = await this._repository.findAll();
    
    // Para cada categoria que tem no banco:
    return clientesDoBanco.map((row: any) => {
      // Vai ser criado uma instância da classe Categorias
      const cliente = new Clientes(row.nomeCliente, row.email, row.idCliente);
      
      // Chama o método mostrarDados() dessa instância
      return cliente.mostrarDados();
    });
  }

  /**
   * Busca uma categoria por ID e retorna formatada com mostrarDados()
   */
  async selecionarIdFormatado(idCliente: number): Promise<string | null> {
    // Faz uma busca no banco
    const rows = await this._repository.selectById(idCliente);
    
    // Se não achou, retorna null
    if (rows.length === 0) return null;
    
    // Pega a primeira (e única) categoria encontrada
    const row = rows[0];
    
    // Cria INSTÂNCIA e chama mostrarDados()
    const clientes = new Clientes(row.nomeCliente, row.email, row.idCliente);
    return clientes.mostrarDados();
  }

}