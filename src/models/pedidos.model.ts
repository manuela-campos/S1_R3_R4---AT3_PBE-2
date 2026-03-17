import { RowDataPacket } from "mysql2";

export class Pedidos {
  private _idPedido?: number;
  private _descricaoCategoria: string;

//   constructor(descricaoCategoria: string, idCategoria?: number) {
//     this._idCategoria = idCategoria;
//     this._descricaoCategoria = descricaoCategoria;
//   }

//   // GETTERS
//   public get IdCategoria(): number | undefined {
//     return this._idCategoria;
//   }

//   get DescricaoCategoria(): string {
//     return this._descricaoCategoria;
//   }


//   // SETTERS
//   set DescricaoCategoria(valor: string) {
//     const values = (valor ?? "").trim();
//     // Regra simples: 4-20 caracteres alfanuméricos, hífen e barra permitidos
//     const regex = /^[A-Za-z0-9\-\/]{4,20}$/;
//     if (!regex.test(values)) {
//       throw new Error(
//         "Categoria inválida. Use 4 a 20 caracteres (letras, números).",
//       );
//     }
//     this._descricaoCategoria = values;
//   }

//   public static criar(
//     descricaoCategoria: string,
//     // dataCad: Date,
//   ): Categorias {
//     return new Categorias(descricaoCategoria);
//   }

//   // update
//   public static editar(
//     descricaoCategoria: string,
//     idCategoria: number,
//   ) {
//     return new Categorias(descricaoCategoria, idCategoria);
//   }

//     mostrarDados(): string {
//       return [
//         "--- Dados da Categoria ---",
//         `ID da Categoria: ${this.IdCategoria}`,
//         `Descrição da Categoria: ${this.DescricaoCategoria}`,
//       ].join("");
//     }

//     inserir(): Categorias {
//       return this;
//     }

//     alterar(): Categorias {
//       return this;
//     }
}
