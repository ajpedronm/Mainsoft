const express = require("express")
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express()
var COUNT_API = 0;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor esta corriendo en el puerto ${PORT}`));

app.post("/hook", (req, res) => {
  console.dir(req.body);
  //console.dir(req.body.issue.customPayloads);

  res.status(200).send(req.body).end();
});

app.post('/webhook', (req, res) => {
  // El cuerpo de la solicitud POST enviado al servidor Express
  const requestBody = req.body;

  // Aquí puedes hacer lo que necesites con el cuerpo de la solicitud, como enviarlo a otro servicio, etc.
  console.log('Received POST request with body:', requestBody);

  const body = {
    "priority_id": 4,
    "description": requestBody.issue.suggestion + " Tipe: " + requestBody.issue.type + " Link: " + requestBody.issue.link,
    "category_id": 41,
    "title": requestBody.issue.text + " 502 Bad Gateway Nginx - Middleware",
    "type_id": 2,
    "creator_id": 1,
    "customer_id": 5
  };

  const config = {
    headers: {
      'Authorization': process.env.AUTH, // middleware-user:dIW2YU2GYIPq1AZqCaHtLGlM
      'Content-Type': 'application/json' // Es importante especificar el tipo de contenido JSON
    }
  };

  console.log("Body a InvGate: ", body);
  // Ejemplo: Enviar el cuerpo de la solicitud a otra URL usando axios
  // axios.post('https://mainsoft.sd.cloud.invgate.net/api/v1/incident', body, config) - anterior EndPoint
  axios.post(process.env.INVGATE_URL, body, config)
    .then(response => {
      const time = Date.now();
      const date = new Date(time);
      const currentDate = date.toString();
      COUNT_API = COUNT_API + 1;
      console.log("Current Date and Time: " + currentDate);
      console.log('Response from webhook:', response.data);
      console.log('-----------------------------------------');
      console.log('-------- Response Ansible --------------- ' + COUNT_API);
      res.send('POST request sent successfully to webhook');
    })
    .catch(error => {
      console.error('Error sending POST request to webhook:', error);
      res.status(500).send('Error sending POST request to webhook');
    });
});