const app = require("./app");

app.listen(process.env.PORT || 3000, () => console.log("O servidor esta rodando na porta ", process.env.PORT || 3000));
