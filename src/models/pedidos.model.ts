import { RowDataPacket } from "mysql2";


export class Pedidos {
  private _idPedido?: number;
  private _idCliente: number;
  private _idVendedor: number;
  private _valorTotal?: number;
  private _statusPedido: string;

  constructor(
    idCliente: number,
    idVendedor: number,
    statusPedido: string,
    valorTotal?: number,
    idPedido?: number,
  ) {
    this._idPedido = idPedido;
    this._idCliente = idCliente;
    this._idVendedor = idVendedor;
    this._valorTotal = valorTotal;
    this._statusPedido = statusPedido;
  }

  // GETTERS
  public get IdPedido(): number | undefined {
    return this._idPedido;
  }

  get IdCliente(): number | undefined {
    return this._idCliente;
  }

  get IdVendedor(): number | undefined {
    return this._idVendedor;
  }

  get ValorTotal(): number | undefined {
    return this._valorTotal;
  }

  get StatusPedido(): string {
    return this._statusPedido;
  }

  // SETTERS
  set StatusPedido(valor: string) {
    const values = (valor ?? "").trim();
    // Regra simples: 4-20 caracteres alfanuméricos, hífen e barra permitidos
    const regex = /^[A-Za-z0-9\-\/]{4,20}$/;
    if (!regex.test(values)) {
      throw new Error("Status inválido. Use 4 a 20 caracteres (letras).");
    }
    this._statusPedido = values;
  }

  // set ValorTotal(valor: number) {
  //   if (Number.isNaN(valor) || valor < 0 || valor > 10) {
  //     throw new RangeError("Média final deve estar entre 0 e 10.");
  //   }
  //   this._valorTotal = Math.round(valor * ) / 100;
  // }

  public static criarPedidos(
    idCliente: number,
    idVendedor: number,
    valorTotal: number,
    statusPedido: string,
    // dataCad: Date,
  ): Pedidos {
    return new Pedidos(idCliente, idVendedor, statusPedido, valorTotal);
  }

  // update
  public static editarPedidos(
    idCliente: number,
    idVendedor: number,
    valorTotal: number,
    statusPedido: string,
    idPedido:number
  ) {
    return new Pedidos( idCliente, idVendedor, statusPedido, valorTotal, idPedido);
  }

  mostrarDados(): string {
    return [
      "--- Dados do Pedido ---",
      `ID do Pedido: ${this.IdPedido}`,
      `ID do Cliente: ${this.IdCliente}`,
      `ID do Pedido: ${this.IdVendedor}`,
      `Valor Total do Pedido: ${this.ValorTotal}`,
      `Status do Pedido: ${this.StatusPedido}`,
    ].join("");
  }

  inserir(): Pedidos {
    return this;
  }

  alterar(): Pedidos {
    return this;
  }
}
