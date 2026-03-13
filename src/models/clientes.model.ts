import { RowDataPacket } from "mysql2";
import { Produtos } from "./produtos.model";

export class Clientes {
  private _idCliente?: number;
  private _nomeCliente: string;
  private _email: string;

  constructor(nomeCliente: string, email: string, idCliente?: number) {
    this._idCliente = idCliente;
    this._nomeCliente = nomeCliente;
    this._email = email;
  }

  // GETTERS
  public get IdCliente(): number | undefined {
    return this._idCliente;
  }

  get NomeCliente(): string {
    return this._nomeCliente;
  }

  get Email(): string{
    return this._email;
  }

  // SETTERS
  set Email(valor: string) {
    const values = (valor ?? "").trim();
    // Regra simples: 4-20 caracteres alfanuméricos, hífen e barra permitidos
    const regex = /^[A-Za-z0-9\-\/]{4,20}$/;
    if (!regex.test(values)) {
      throw new Error(
        "Email inválido. Use 4 a 20 caracteres (letras, números).",
      );
    }
    this._email = values;
  }

  public static criarCliente(
    nomeCliente: string,
    email: string
    // dataCad: Date,
  ): Clientes {
    return new Clientes(nomeCliente, email);
  }

  // update
  public static editarCliente(
    nomeCliente: string,
    email: string,
    idCliente: number,
  ) {
    return new Clientes(nomeCliente, email, idCliente);
  }

    mostrarDados(): string {
      return [
        "--- Dados do(a) Cliente ---",
        `ID do Cliente: ${this.IdCliente}`,
        `Nome do Cliente: ${this.NomeCliente}`,
        `Email para Contato: ${this.Email}`
      ].join("");
    }

    inserir(): Clientes {
      return this;
    }

    alterar(): Clientes {
      return this;
    }
}
