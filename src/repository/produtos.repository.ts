import { db } from "../database/connection.database";
import { Produtos } from "../models/produtos.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ProdutosRepository {
  async findAll(): Promise<[]> {
    //ESPERO QUE TENHO RETORNO DESSE TIPO
    const [rows] = await db.execute<[]>("SELECT * FROM produtos;");
    return rows;
  }

  async selectById(idProduto: number): Promise<RowDataPacket[]> {
    const sql = "SELECT * FROM produtos WHERE idProduto = ?;";
    const values = [idProduto];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    return rows;
  }

//   // Omit =>  omite os campos discriminados, ou seja, só usa a interface mais sem o campo id porque ele é auto increment
  async create(dados: Omit<Produtos, "idProduto">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO produtos (nomeProduto, valorProduto, vinculoImagem) VALUES (?,?,?);";
    const values = [
      dados.NomeProduto,
      dados.ValorProduto,
      dados.VinculoImagem
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

// //   // Aqui vai receber o id da categoria que quer atualizar e logo em seguida os campos que quer atualizar
  async update(
    idProduto: number,
    dados: Omit<Produtos, "idProduto">,
  ): Promise<ResultSetHeader> {
    const sql =
      "UPDATE produtos SET nomeProduto = ?, valorProduto = ?, vinculoImagem = ? WHERE idProduto=?;";
    const values = [
      dados.NomeProduto,
      dados.ValorProduto,
      dados.VinculoImagem,
      idProduto
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
  async delete(idProduto: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM produtos WHERE idProduto=?;";
    const values = [idProduto];
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