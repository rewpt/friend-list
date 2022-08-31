import express from 'express'
const app = express();
import cors from 'cors'

//middleware imports
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(cors())


let appointments = [
  {id: 1, name: "Doctors", date: "11/9/2022"},
  {id: 2, name: "Dentist", date: "06/11/2022"},
  {id: 3, name: "Optometrist", date: "23/12/2022"}
];

app.get('/appointments', (req, res) => {
  res.send(appointments)
})

//Take in all http methods & routes left over after checking routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server listening on port ${port}`))