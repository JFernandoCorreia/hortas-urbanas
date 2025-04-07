const pool = require("../config/db");

class User {
  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  static async create({ nome, email, senha, telefone }) {
    const [result] = await pool.query(
      "INSERT INTO users (nome, email, senha, telefone) VALUES (?, ?, ?, ?)",
      [nome, email, senha, telefone]
    );
    return result.insertId;
  }

  static async getAllUsers() {
    const [rows] = await db.query("SELECT * FROM usuarios");
    return rows;
  }

  static async approveUser(id) {
    const [result] = await db.query("UPDATE usuarios SET aprovado = 1 WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = User;
