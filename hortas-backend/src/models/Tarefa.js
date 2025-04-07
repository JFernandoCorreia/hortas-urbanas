const db = require("../config/db");

class Tarefa {
  static async create({ descricao, data, status, usuario_id, horta_id }) {
    const [result] = await db.query(
      "INSERT INTO tarefas (descricao, data, status, usuario_id, horta_id) VALUES (?, ?, ?, ?, ?)",
      [descricao, data, status, usuario_id, horta_id]
    );
    return result.insertId;
  }

  static async getByHorta(horta_id) {
    const [rows] = await db.query("SELECT * FROM tarefas WHERE horta_id = ?", [horta_id]);
    return rows;
  }
}

module.exports = Tarefa;
