import { database } from './connectionMongoDB.ts'
import { ObjectId, type OptionalId } from 'mongodb'
import type { Request } from 'express'
import express, {request} from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

interface Province {
    name: string,
    animal: {
      name: string,
      weight: string,
      height: string,
      food: string,
      sound: string,
      image: string
     },
    bird: {
      name: string,
      weight: string,
      wingspan: string,
      stay: boolean,
      food: string,
      sound: string,
      image: string
    },
    food: {
      name: string,
      description: string,
      recipeLink: string,
      image: string
    },
    plant: {
     name: string,
     type: string,
     season: string,
     protected: boolean,
     image: string
    }
}

app.get("/province", async (_request, response) => {
    const results = await database.collection<Province>('province').find().toArray()
    response.json(results);
})

app.get('/', (_request, response) => {
  response.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})
