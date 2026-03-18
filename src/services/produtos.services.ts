import { ProdutosRepository } from "../repository/produtos.repository";
import { Produtos } from "../models/produtos.model";

export class ProdutosService {
  constructor(private _repository = new ProdutosRepository()) {}

  async criarProd(nomeProduto: string, valorProduto: number, vinculoImagem: string, idCategoria: number) {
    const produto = Produtos.criarProduto(nomeProduto, valorProduto, vinculoImagem,idCategoria);
    return await this._repository.create(produto);
  }
  async editarProd(nomeProduto: string, valorProduto: number, vinculoImagem: string, idProduto: number, idCategoria: number) {
    const produto = Produtos.editarProduto(
      nomeProduto,
      valorProduto,
      vinculoImagem,
      idCategoria,
      idProduto
    );
    return await this._repository.update(idProduto, produto);
  }
  async excluir(idCategoria: number) {
    return await this._repository.delete(idCategoria);
  }
    /**
   * Busca todos os produtos e retorna formatadas com mostrarDados()
   */
  async selecionarTodosFormatado(): Promise<string[]> {
    // Busca no banco que vem como array de objetos simples
    const produtosDoBanco = await this._repository.findAll();
    
    // Para cada produto que tem no banco:
    return produtosDoBanco.map((row: any) => {
      // Vai ser criado uma instância da classe Produtos
      const produtos = new Produtos(row.nomeProduto, row.valorProduto, row.vinculoImagem,row.descricaoCategoria, row.idCategoria);
      
      // Chama o método mostrarDados() dessa instância
      return produtos.mostrarDados();
    });
  }

  /**
   * Busca um produto por ID e retorna formatada com mostrarDados()
   */
  async selecionarIdFormatado(idProduto: number): Promise<string | null> {
    // Faz uma busca no banco
    const rows = await this._repository.selectById(idProduto);
    
    // Se não achou, retorna null
    if (rows.length === 0) return null;
    
    // Pega a primeira (e única) produto encontrado
    const row = rows[0];
    
    // Cria INSTÂNCIA e chama mostrarDados()
    const produto = new Produtos(row.nomeProduto, row.valorProduto, row.vinculoImagem,row.descricaoCategoria, row.idCategoria);
    return produto.mostrarDados();
  }

}