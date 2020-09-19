
const githubService = require("./github.service.js")
const dao = require("../dao/repositorio.dao.js")

module.exports = {
  async buscarRepositorios(linguagem) {
    const url = githubService.montarUrl(linguagem);
  
    try{
      const retorno = await githubService.buscarRepositorios(url);
      console.log("Registros encontrados: ", retorno.data);
  
      if (!retorno.data.items && retorno.data.items.length === 0) {
        return Error(`Não foi encontrado nenhum item para a linguagem '${linguagem}'`)
      }
  
      await dao.delete(linguagem);
      await retorno.data.items.map( async item => await dao.create(item));
  
      return await dao.read(linguagem);
    } catch (e) {
      throw Error(`Erro ao buscar repositórios da linguagem '${linguagem}'`);
    }
  },
}