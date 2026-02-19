import { database } from './connectionMongoDB.ts'
import { ObjectId, type OptionalId } from 'mongodb'
import type { Request } from 'express'
import express, {request} from 'express'
import { databaseSQL } from './connectionMySQL.ts'
import type { RowDataPacket } from 'mysql2'

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

interface User extends RowDataPacket {
  userId: number,
  userType: string,
  userFirstName: string,
  userLastName: string,
  userName: string,
  userPassword: string
}

interface UpdateUser {
  userId: number,
  userType: string,
  userFirstName: string,
  userLastName: string,
  userName: string,
  userPassword: string
}

type PostUser = Omit<UpdateUser, 'userId'>

interface DeleteUser{
  userId: number
}


interface ResponseMessage {
  message: string
}

app.get("/province", async (_request, response) => {
    const results = await database.collection<Province>('provinces').find().toArray()
    response.json(results);
})


app.get('/user', async (_request, response) => {
  const [results] = await databaseSQL.query<User[]>(
    'SELECT * FROM user',
  )

  response.status(200).send(results)
})

app.post('/user', async (
   request: Request<
      void, // request.params
      ResponseMessage, // response.send
      PostUser, // request.body
      void // request.query
    >,
    response
  ) => {
    await databaseSQL.execute(
      'INSERT INTO user (userType, userFirstName, userLastName) VALUES (?, ?, ?)',
      [request.body.userType, request.body.userFirstName, request.body.userLastName]
    )

    response.status(201).send({message:"User successfully posted."})
  }
)

app.put('/user', async (
   request: Request<
      void, // request.params
      ResponseMessage, // response.send
      UpdateUser, // request.body
      void // request.query
    >,
    response
  ) => {
    await databaseSQL.execute(
      'UPDATE user SET userType = ?, userFirstName= ?, userLastName=? WHERE userId=? ',
      [request.body.userType, request.body.userFirstName, request.body.userLastName, request.body.userId]
    )

    response.status(200).send({message:"User successfully added"})
  }
)

app.delete('/user/:userId', async (
   request: Request<
      DeleteUser, // request.params
      ResponseMessage, // response.send
      void, // request.body
      void // request.query
    >,
    response
  ) => {
    await databaseSQL.execute(
      'DELETE FROM user WHERE userId=?',
      [request.params.userId]
    )

    response.status(201).send({message:"User successfully deleted."})
  }
)

app.get('/', (_request, response) => {
  response.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})
