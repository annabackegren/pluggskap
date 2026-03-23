import type { Request, Response } from 'express';
import { database } from '../connectionMongoDB.ts'
import type {ResponseMessage} from '../interfaces/responseInterface.ts'

interface Province {
    id: string,
    name: string,
    coatOfArms: string,
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

export const getProvinces = async (_req: Request, res: Response) => {
  try {
    const provinces = await database.collection<Province>('provinces').find().toArray();
    res.json(provinces)
  } catch (error: any) {
    console.error(error);
    res.status(500).send
  }
}

export const getProvince = async (_req: Request, res: Response<Province | ResponseMessage>) => {
  try {
    const provinceId = _req.params.id
    if(!provinceId){
      return res.status(400).json({error: 'Could not find any province id'})
    }

    const province = await database.collection<Province>('provinces').findOne({id: provinceId});

    if(!province){
      return res.status(404).json({error: 'Province not found'})
    }

    res.json(province)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: 'Server error'})
  }
}