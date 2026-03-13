import { RowDataPacket } from "mysql2";

export class Vendedores {
  private _idVendedor?: number;
  private _nomeVendedor: string;
  private _cargo: string;

  constructor(nomeVendedor: string, cargo: string, idVendedor?: number) {
    this._idVendedor = idVendedor;
    this._nomeVendedor = nomeVendedor;
    this._cargo = cargo;
  }

  // GETTERS
  public get IdVendedor(): number | undefined {
    return this._idVendedor;
  }

  get NomeVendedor(): string {
    return this._nomeVendedor;
  }

  get Cargo(): string{
    return this._cargo
  }

  // SETTERS
  set NomeVendedor(valor: string) {
    const values = (valor ?? "").trim();
    // Regra simples: 4-20 caracteres alfanuméricos, hífen e barra permitidos
    const regex = /^[A-Za-z0-9\-\/]{4,20}$/;
    if (!regex.test(values)) {
      throw new Error(
        "Nome inválido. Use 4 a 20 caracteres (letras).",
      );
    }
    this._nomeVendedor = values;
  }

  public static criarVendedor(
    nomeVendedor: string,
    cargo: string
  ): Vendedores {
    return new Vendedores(nomeVendedor, cargo);
  }

  // update
  public static editarVendedor(
    nomeVendedor: string,
    cargo: string,
    idVendedor: number,
  ) {
    return new Vendedores(nomeVendedor, cargo, idVendedor);
  }

    mostrarDados(): string {
      return [
        "--- Dados dos Vendedores ---",
        `ID do(a) Vendedor: ${this.IdVendedor}`,
        `Nome do(a) Vendedor: ${this.NomeVendedor}`,
        `Cargo do Vendedor: ${this.Cargo}`
      ].join("");
    }

    inserir(): Vendedores {
      return this;
    }

    alterar(): Vendedores {
      return this;
    }
}
