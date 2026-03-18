import { RowDataPacket } from "mysql2";
import { Pedidos } from "./pedidos.model";


export class ItensPedidos{
  private _idItem?: number;
  private _quantidade: number;
  private _valorUnidade: number;
     private _idPedido: number;
    private _idProduto: number;

  constructor(
    idPedido: number,
    idProduto: number,
    quantidade: number,
    valorUnidade: number,
    idItem?: number
  ) {
   

    this._quantidade = quantidade;
    this._valorUnidade = valorUnidade;
    this._idItem = idItem;
    this._idPedido=idPedido;
    this._idProduto=idProduto;
  }

  // GETTERS
  public get IdItem(): number | undefined {
    return this._idItem;
  }
  public get IdPedido(): number {
    return this._idPedido;
  }
  public get IdProduto(): number {
    return this._idProduto;
  }

  get Quantidade(): number  {
    return this._quantidade;
  }

  get ValorUnidade(): number {
    return this._valorUnidade;
  }


  public static criarItensPedidos(
    idPedido: number,
    idProduto: number,
    quantidade: number,
    valorUnidade: number,
  
  ): ItensPedidos {
    return new ItensPedidos(idPedido, idProduto, quantidade,valorUnidade);
  }

  // update
  public static editarItensPedidos(
    idPedido: number,
    idProduto: number,
    quantidade: number,
    valorUnidade: number,
    idItem:number
  ) {
    return new ItensPedidos( idPedido, idProduto, quantidade,valorUnidade, idItem);
  }

  mostrarDados(): string {
    return [
      "--- Dados do Pedido ---",
      `ID do Itens Pedido: ${this.IdItem}`,
      `ID do Pedido: ${this.IdPedido}`,
      `ID do Produto: ${this.IdProduto}`,
      `Quantidade: ${this.Quantidade}`,
      `Valor por unidade: ${this.ValorUnidade}`,
    ].join("");
  }

  inserirItensPedidos(): ItensPedidos{
    return this;
  }

  alterarItensPedidos(): ItensPedidos {
    return this;
  }
}
