import express from 'express'
import cors from 'cors'
import router from './routes/api.js'

const app = express();

//middleware imports
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(cors())
app.use(express.json())
app.use('/api', router);

//Take in all http methods & routes left over after checking routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server listening on port ${port}`))