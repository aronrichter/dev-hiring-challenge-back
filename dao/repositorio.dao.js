const db = require("../config/database.js");

module.exports = {
  async create(item) {
    await db.query(
      `INSERT INTO repositorio (nome,
        proprietario,
        descricao,
        url,
        linguagem,
        forks,
        issues,
        estrelas,
        seguidores,
        privado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [ item.name,
        item.owner.login,
        item.description,
        item.html_url,
        item.language.toUpperCase(),
        item.forks_count,
        item.open_issues_count,
        item.stargazers_count,
        item.watchers,
        item.private]
    );
  },

  async delete(linguagem) {
    await db.query('DELETE FROM repositorio WHERE linguagem = $1', [
      linguagem.toUpperCase()
    ]);
  },

  async read(linguagem) {
    const response = await db.query('SELECT * FROM repositorio WHERE linguagem = $1', [
      linguagem.toUpperCase()
    ]);
    
    return response.rows;
  }
}
