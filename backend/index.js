import express from 'express'
const app = express();
import cors from 'cors'

//middleware imports
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(cors())


let birthdays = [
  {id: 1, name: "Jerry", date: new Date("1954-04-29")},
  {id: 2, name: "George", date: new Date("1959-09-23")},
  {id: 3, name: "Elaine", date: new Date("1961-01-03")}
];

app.get('/birthdays', (req, res) => {
  res.send(birthdays)
})

//Take in all http methods & routes left over after checking routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server listening on port ${port}`))