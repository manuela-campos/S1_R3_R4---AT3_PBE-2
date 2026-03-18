import { db } from "../database/connection.database";
import { Vendedores } from "../models/vendedores.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class VendedoresRepository {
  async findAll(): Promise<[]> {
    //ESPERO QUE TENHO RETORNO DESSE TIPO
    const [rows] = await db.execute<[]>("SELECT * FROM vendedores;");
    return rows;
  }

  async selectById(idVendedor: number): Promise<RowDataPacket[]> {
    const sql = "SELECT * FROM vendedores WHERE idVendedor = ?;";
    const values = [idVendedor];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    return rows;
  }

  // Omit =>  omite os campos discriminados, ou seja, só usa a interface mais sem o campo id porque ele é auto increment
  async create(dados: Omit<Vendedores, "idVendedor">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO vendedores (nomeVendedor, cargo) VALUES (?,?);";
    const values = [
      dados.NomeVendedor,
      dados.Cargo
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

//   // Aqui vai receber o id do vendedor que quer atualizar e logo em seguida os campos que quer atualizar
  async update(
    idVendedor: number,
    dados: Omit<Vendedores, "idVendedor">,
  ): Promise<ResultSetHeader> {
    const sql =
      "UPDATE vendedores SET nomeVendedor = ?, cargo =? WHERE idVendedor=?;";
    const values = [
      dados.NomeVendedor,
      dados.Cargo,
      idVendedor
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
  async delete(idVendedor: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM vendedores WHERE idVendedor=?;";
    const values = [idVendedor];
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