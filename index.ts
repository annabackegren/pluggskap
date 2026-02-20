import { database } from './connectionMongoDB.ts'
import { ObjectId, type OptionalId } from 'mongodb'
import type { Request } from 'express'
import express, {request} from 'express'
import { databaseSQL } from './connectionMySQL.ts'

import provinceRoutes from './routes/provinceRoutes.ts'
import userRoutes from './routes/userRoutes.ts'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/province', provinceRoutes)
app.use('/user', userRoutes)

app.get('/', (_request, response) => {
  response.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})
