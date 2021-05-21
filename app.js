const express = require("express");
const fetch = require("isomorphic-fetch");
  
const app = express();

app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: false }));

app.post("/submit", (req, res) => {
  const response_key = req.body["g-recaptcha-response"];
  const secret_key = "6LeNsOEaAAAAAPUHvcQCNcuhnAFSB0thJo7KPtir";

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => {
      if (google_response.success == true) {
        return res.send('<p>Parabéns, você foi validado com sucesso! Humano inteligente. :)</p>');
      } else {
        return res.send('<p>Desculpa, infelizmente você não passou na validação. Robô safado. :(</p>');
      }
    })
    .catch(() => {
      return res.send('<p>Ocorreu um erro, agora nunca saberemos se você é um robô ou não...</p>');
    });
});
  
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));