
const githubService = require("./github.service.js")
const dao = require("../dao/repositorio.dao.js")

module.exports = {
  async buscarRepositorios(linguagem) {
    try {
      const repositoriosGithub = await buscarRepositorioGithub(linguagem);
      
      if (!repositoriosGithub) {
        console.log ("Tentativa para verificar se já existe algum registro com a linguagem ", linguagem);
        return await buscarRepositoriosDB(linguagem);
      }

      await dao.delete(linguagem);
      await retorno.data.items.map( async item => await dao.create(item));
      return await buscarRepositoriosDB(linguagem);
    } catch(e) {
      return e;
    }
  },

  async buscarRepositoriosDB(linguagem) {
    return await dao.read(linguagem);
  },

  async buscarRepositorioGithub(linguagem) {
    const url = githubService.montarUrl(linguagem);

    try {
      const repositoriosEncontrados =  await githubService.buscarRepositorios(url);

      if (!repositoriosEncontrados.data.items && repositoriosEncontrados.data.items.length === 0) {
        return Error(`Não foi encontrado nenhum item para a linguagem '${linguagem}'`)
      }

      return repositoriosEncontrados;
    } catch(e) {
      console.log("Erro ao buscar os dados no github: ", e)
      return null;
    }
  }
}