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
      [item.id, 
        item.name,
        item.owner.login,
        item.html_url,
        toUpperCase(item.language),
        item.forks_count,
        item.open_issues_count,
        item.stargazers_count,
        item.private]
    );
    return true;
  },

  async delete(linguagem) {
    console.log("Excluído: ", linguagem);
    await db.query('DELETE FROM repositorio WHERE linguagem = $1', [
      toUpperCase(linguagem)
    ]);
  
    return true;
  },

  async read(linguagem) {
    console.log("Encontrado: ", linguagem)
    const response = await db.query('SELECT * FROM repositorio WHERE linguagem = $1', [
      toUpperCase(linguagem)
    ]);
    
    return response.rows;
  }
}
