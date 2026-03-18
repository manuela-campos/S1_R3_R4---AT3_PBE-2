import { RowDataPacket } from "mysql2";
import { Categorias } from "./categorias.model";

export class Produtos {
  private _idProduto?: number;
  private _nomeProduto: string = "";
  private _valorProduto: number;
  private _vinculoImagem: string;
  private _idCategoria: number;

  constructor(
    nomeProduto: string,
    valorProduto: number,
    vinculoImagem: string,
    idCategoria: number,
    idProduto?: number
  ) {

    this._idProduto = idProduto;
    this._nomeProduto = nomeProduto;
    this._valorProduto = valorProduto;
    this._vinculoImagem = vinculoImagem;
    this._idCategoria = idCategoria;
  }


  // GETTERS
  public get IdProduto(): number | undefined {
    return this._idProduto;
  }

  get NomeProduto(): string {
    return this._nomeProduto;
  }

  get ValorProduto(): number{
    return this._valorProduto;
}

  get VinculoImagem(): string{
    return this._vinculoImagem;
}
  // SETTERS
  set nomeProduto(valor: string) {
    const values = (valor ?? "").trim();
    // Regra simples: 4-20 caracteres alfanuméricos, hífen e barra permitidos
    const regex = /^[A-Za-z0-9\-\/]{4,20}$/;
    if (!regex.test(values)) {
      throw new Error(
        "Nome invalido. Use 4 a 20 caracteres (letras).",
      );
    }
    this._nomeProduto = values;
  }

  public static criarProduto(
    nomeProduto: string,
    valorProduto: number,
    vinculoImagem: string, 
    idCategoria: number
  ): Produtos {
    return new Produtos(nomeProduto, valorProduto, vinculoImagem, idCategoria);
  }

  // update
  public static editarProduto(
    nomeProduto: string,
    valorProduto: number,
    vinculoImagem: string ,
    idCategoria: number,
    idProduto: number,
  ) {
    return new Produtos(nomeProduto, valorProduto, vinculoImagem, idCategoria, idProduto);
  }

    mostrarDados(): string {
      return [
        "--- Dados do Produto ---",
        `ID do Produto: ${this.IdProduto}`,
        `Nome do produto: ${this.NomeProduto}`,
        `Valor do Produto: ${this.ValorProduto}`,
        `Vinculo da Imagem: ${this.VinculoImagem}`,
        // `Descrição da Categoria: ${this.idCategoria}`
      ].join("");
    }

    inserirProdutos(): Produtos {
      return this;
    }

    alterarProdutos(): Produtos {
      return this;
    }
}
