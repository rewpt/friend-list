import express from 'express'
const app = express();

//middleware imports
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from './middleware/error-handler.js';

app.get('/', (req, res) => {
  res.send('Welcome!')
})

//Take in all http methods & routes left over after checking routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server listening on port ${port}`))