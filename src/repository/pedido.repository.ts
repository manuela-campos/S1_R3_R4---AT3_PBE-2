import { db } from "../database/connection.database";
import { Pedidos } from "../models/pedidos.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class PedidosRepository {
  async findAll(): Promise<RowDataPacket[]> {
    //ESPERO QUE TENHO RETORNO DESSE TIPO
    const [rows] = await db.execute<RowDataPacket[]>("SELECT * FROM pedidos;");
    return rows;
  }

  async selectById(idPedido: number): Promise<RowDataPacket[]> {
    const sql = "SELECT * FROM pedidos WHERE idPedido = ?;";
    const values = [idPedido];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    return rows;
  }

  // Omit =>  omite os campos discriminados, ou seja, só usa a interface mais sem o campo id porque ele é auto increment
  async create(dados: Omit<Pedidos, "idPedido" | "valorTotal">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO pedidos (valorTotal, statusPedido) VALUES (?,?);";
    const values = [
      // dados.ValorTotal,
      dados.StatusPedido
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

//   // Aqui vai receber o id do pedido que quer atualizar e logo em seguida os campos que quer atualizar
  async update(
    idVendedor: number,
    dados: Omit<Pedidos, "idPedido" | "valorTotal">,
  ): Promise<ResultSetHeader> {
    const sql =
      "UPDATE pedidos SET valorTotal = ?, statusPedido =? WHERE idPedido=?;";
    const values = [
      // dados.ValorTotal,
      dados.StatusPedido,
      idVendedor
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
  async delete(idPedido: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM pedidos WHERE idPedido=?;";
    const values = [idPedido];
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