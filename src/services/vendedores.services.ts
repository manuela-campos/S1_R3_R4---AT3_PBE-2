import { VendedoresRepository } from "../repository/vendedores.repository";
import { Vendedores } from "../models/vendedores.model";
import { log } from "console";

export class VendedoresService {
  constructor(private _repository = new VendedoresRepository()) {}

  async criarVendedores(nomeVendedor: string, cargo: string) {
    const vendedor = Vendedores.criarVendedor(nomeVendedor, cargo);
    return await this._repository.create(vendedor);
  }
  async editarVendedores(nomeVendedor: string, cargo: string, idVendedor: number) {
    const vendedor = Vendedores.editarVendedor(
      nomeVendedor,
      cargo,
      idVendedor,
    );
    return await this._repository.update(idVendedor, vendedor);
  }
  async excluirVendedores(idVendedor: number) {
    return await this._repository.delete(idVendedor);
  }
    /**
   * Busca todas as Vendedores e retorna formatadas com mostrarDados()
   */
  async selecionarTodosFormatado(): Promise<string[]> {
    // Busca no banco que vem como array de objetos simples
    const VendedoresDoBanco = await this._repository.findAll();
    
    // Para cada vendedor que tem no banco:
    return VendedoresDoBanco.map((row: any) => {
      // Vai ser criado uma instância da classe Vendedores
      const vendedor = new Vendedores(row.nomeVendedor, row.cargo, row.idVendedor);
      
      // Chama o método mostrarDados() dessa instância
      return vendedor.mostrarDados();
    });
  }

  /**
   * Busca um vendedor por ID e retorna formatada com mostrarDados()
   */
  async selecionarIdFormatado(idVendedor: number): Promise<string | null> {
    // Faz uma busca no banco
    const rows = await this._repository.selectById(idVendedor);
    
    // Se não achou, retorna null
    if (rows.length === 0) return null;
    
    // Pega a primeira (e única) vendedor encontrada
    const row = rows[0];
    
    // Cria INSTÂNCIA e chama mostrarDados()
    const vendedor = new Vendedores(row.nomeVendedor, row.cargo, row.idVendedor);
    return vendedor.mostrarDados();
  }

}