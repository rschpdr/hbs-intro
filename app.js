// 1. Importar o Express neste arquivo
const express = require("express");

// 14. Importar roteador
const appRouter = require("./routes/index");

// BONUS. Registrar pasta contendo os layouts parciais (partials)
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/public/views/partials");

// 2. Instanciar um novo app Express
const app = express();

// 3. Configurar nosso app para servir conteudo estatico da pasta public
app.use(express.static("public"));

// 4. Configura o Express para utilizar o motor de renderizacao Handlebars
app.set("view engine", "hbs");

// BONUS. Configura em qual pasta o HBS vai procurar views e layouts para renderizar automaticamente. Necessario para poder usar {{{body}}}
app.set("views", __dirname + "/public/views");

// 15. Redireciona todas as requisicoes para o roteador
app.use("/", appRouter);

// 5. Colocar o servidor HTTP para escutar requisicoes na porta 3000
app.listen(3000, () => console.log("Server up and running at port 3000"));
