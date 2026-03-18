import { db } from "../database/connection.database";
import { Clientes } from "../models/clientes.model"; 
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ClientesRepository {
  async findAll(): Promise<[]> {
    //ESPERO QUE TENHO RETORNO DESSE TIPO
    const [rows] = await db.execute<[]>("SELECT * FROM clientes;");
    return rows;
  }

  async selectById(idCliente: number): Promise<RowDataPacket[]> {
    const sql = "SELECT * FROM clientes WHERE idCliente = ?;";
    const values = [idCliente];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    return rows;
  }

  // Omit =>  omite os campos discriminados, ou seja, só usa a interface mais sem o campo id porque ele é auto increment
  async create(dados: Omit<Clientes, "idCliente">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO clientes (nomeCliente, email) VALUES (?, ?);";
    const values = [
      dados.NomeCliente,
      dados.Email
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

//   // Aqui vai receber o id do cliente que quer atualizar e logo em seguida os campos que quer atualizar
  async update(
    idCliente: number,
    dados: Omit<Clientes, "idCliente">,
  ): Promise<ResultSetHeader> {
    const sql =
      "UPDATE clientes SET nomeCliente = ?, email = ? WHERE idCliente=?;";
    const values = [
      dados.NomeCliente,
      dados.Email,
      idCliente
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
  async delete(idCliente: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM clientes WHERE idCliente=?;";
    const values = [idCliente];
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