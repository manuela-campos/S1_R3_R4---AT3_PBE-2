import { db } from "../database/connection.database";
import { ItensPedidos } from "../models/itensPedidos.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ItensPedidosRepository {
  async findAll(): Promise<[]> {
    //ESPERO QUE TENHO RETORNO DESSE TIPO
    const [rows] = await db.execute<[]>("SELECT * FROM itensPedidos;");
    return rows;
  }

  async selectById(idItem: number): Promise<RowDataPacket[]> {
    const sql = "SELECT * FROM itensPedidos WHERE idItem = ?;";
    const values = [idItem];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    return rows;
  }

  // Omit =>  omite os campos discriminados, ou seja, só usa a interface mais sem o campo id porque ele é auto increment
  async create(dados: Omit<ItensPedidos, "idItem">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO itensPedidos (quantidade, valorUnidade,fk_idPedido, fk_idProduto) VALUES (?,?,?,?);";
    const values = [
      dados.Quantidade,
      dados.ValorUnidade,
      dados.IdPedido,
      dados.IdProduto,
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  //   // Aqui vai receber o id da categoria que quer atualizar e logo em seguida os campos que quer atualizar
  async update(
    idItem: number,
    dados: Omit<ItensPedidos, "idItem">,
  ): Promise<ResultSetHeader> {
    const sql =
      "UPDATE itensPedidos SET quantidade = ?, valorUnidade WHERE idItem=?;";
    const values = [dados.Quantidade, dados.ValorUnidade, idItem];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
  async delete(idItem: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM itensPedido WHERE idItem=?;";
    const values = [idItem];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
}

// ResultSetHeader nos retorna
// {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 5,
//   warningStatus: 0
// }
