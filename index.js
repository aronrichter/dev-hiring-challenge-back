const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const repositorioService = require("./service/repositorio.service.js")

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/repositorios/:linguagem',async (req, res) => {
  console.log("Recebido requisição com parâmetro: ", req.params)

    try {
      const retorno = await repositorioService.buscarRepositorios(req.params.linguagem);      
      return res.send(retorno);
    } catch (e) {
      console.log(e)
      return res.status(400).send(e)
    }
})

app.listen(port, () => {
  console.log(`Running`);
})
