// 6. Importar Express neste arquivo
const express = require("express");

// Importar biblioteca para disparar requisicoes HTTP
// JEITO DIFICIL
// const https = require("https");
// JEITO FACIL
const axios = require("axios");

// Biblioteca para resolucao de caminhos de arquivo relativos para caminhos absolutos
const path = require("path");

// 7. Criar um novo roteador
const router = express.Router();

// 11. Dados simulando um retorno do banco de dados ou API externa
const fakeApiData = [
  { campusName: "Sao Paulo", country: "Brazil" },
  { campusName: "Miami", country: "USA" },
  { campusName: "Mexico City", country: "Mexico" },
  { campusName: "Berlin", country: "Germany" },
  { campusName: "Amsterdam", country: "Netherlands" },
  { campusName: "Barcelona", country: "Spain" },
  { campusName: "Madrid", country: "Spain" },
  { campusName: "Lisbon", country: "Portugal" },
  { campusName: "Paris", country: "France" },
];

// BONUS. Array de itens do menu para o navbar
const menuItems = [
  { text: "Home", url: "/home" },
  { text: "About", url: "/about" },
  { text: "Contact", url: "/contact" },
];

// 8. Listener para requisicoes HTTP do metodo GET na rota /hello
//                    request, response
router.get("/hello", (req, res) => {
  // 12. Resolucao do caminho do arquivo hbs concatenando a pasta do script atual com o caminho relativo da view
  const resolvedPath = path.resolve(__dirname, "../public/views/ih-campi.hbs");

  // 13. Retorna uma resposta HTTP renderizando o arquivo HBS em HTML utilizando o Handlebars
  res.render(resolvedPath, {
    campi: fakeApiData,
    menu: menuItems,
    studentName: "Pedro",
    isEnrolled: false,
    studentAddress: {
      street: "Some street",
      address: "32",
      neighbourhood: "Brooklyn",
    },
  });
});

// Rota para trazer dados de uma cerveja da Punk API

router.get("/get-beer", async (req, res) => {
  // Disparar uma requisicao HTTP para a API WEB da Punk API
  // "Traduzir" o texto em formato JSON para objeto do Javascript
  // Jeito dificil, utilizando biblioteca nativa do Node
  // https
  //   .request(
  //     {
  //       protocol: "https:",
  //       hostname: "api.punkapi.com",
  //       path: "/v2/beers/random",
  //       method: "GET",
  //     },
  //     (response) => {
  //       // Criando variavel pra salvar cada pedaco (chunk) do nosso json, pois eles chegam em varias partes ao longo do tempo
  //       let json = "";
  //       response.on("data", (chunk) => {
  //         // Concatena cada chunk no json
  //         json += chunk;
  //       });
  //       response.on("end", () => {
  //         // O evento end significa que os dados terminaram de chegar, porem agora temos uma string JSON completa.
  //         // O Javascript nao consegue lidar com strings JSON, precisamos converter esta string em objeto
  //         const jsonData = JSON.parse(json);
  //         // Finalmente, podemos usar o objeto resultando do JSON recebido para alimentar nosso HTML
  //         res.render(path.resolve(__dirname, "../public/views/beer.hbs"), {
  //           ...jsonData[0],
  //         });
  //       });
  //     }
  //   )
  //   .end();

  // Jeito facil, usando Axios

  // Receber os dados
  const response = await axios.get("https://api.punkapi.com/v2/beers/random");
  console.log(response.data);

  // Retornar a informacao da cerveja para o usuario em HTML
  res.render(path.resolve(__dirname, "../public/views/beer.hbs"), {
    ...response.data[0],
  });
});

// 9. Exporta o roteador
module.exports = router;
