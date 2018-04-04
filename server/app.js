// server.js
// where your node app starts

// init project
import express from 'express';
import path from 'path';
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
const routes = ["/", "/login", "/register"];

routes.forEach(route => app.get(route, (request, response) => 
  response.sendFile(path.resolve(__dirname + '/../client/views/index.html'))));

// // Simple in-memory store
// const dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ]

// app.get("/dreams", (request, response) => {
//   response.send(dreams)
// })

// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/dreams", (request, response) => {
//   dreams.push(request.query.dream)
//   response.sendStatus(200)
// })

// listen for requests :)
// const listener = app.listen(process.env.PORT, () => {
//   console.log(`Your app is listening on port ${listener.address().port}`)
// })
export default app;