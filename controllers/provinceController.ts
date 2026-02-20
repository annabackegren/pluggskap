import express from 'express';
import type { Request, Response } from 'express';
import { database } from '../connectionMongoDB.ts'

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

export const getProvinces = async (_req: Request, res: Response) => {
  try {
    const provinces = await database.collection<Province>('provinces').find().toArray();
    res.json(provinces)
  } catch (error: any) {
    console.error(error);
    res.status(500).send
  }
}