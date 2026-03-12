import { db } from "../database/connection.database";
import { Categorias } from "../models/categorias.model"; 
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class CategoriasRepository {
  async findAll(): Promise<[]> {
    //ESPERO QUE TENHO RETORNO DESSE TIPO
    const [rows] = await db.execute<[]>("SELECT * FROM categorias;");
    return rows;
  }

  async selectById(idCategoria: number): Promise<RowDataPacket[]> {
    const sql = "SELECT * FROM categorias WHERE idCategoria = ?;";
    const values = [idCategoria];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    return rows;
  }

  // Omit =>  omite os campos discriminados, ou seja, só usa a interface mais sem o campo id porque ele é auto increment
  async create(dados: Omit<Categorias, "idCategoria">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO categorias (descricaoCategoria) VALUES (?);";
    const values = [
      dados.DescricaoCategoria
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

//   // Aqui vai receber o id da categoria que quer atualizar e logo em seguida os campos que quer atualizar
  async update(
    idCategoria: number,
    dados: Omit<Categorias, "idCategoria">,
  ): Promise<ResultSetHeader> {
    const sql =
      "UPDATE categorias SET descricaoCategoria = ? WHERE idCategoria=?;";
    const values = [
      dados.DescricaoCategoria,
      idCategoria
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
  async delete(idCategoria: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM categorias WHERE idCategoria=?;";
    const values = [idCategoria];
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