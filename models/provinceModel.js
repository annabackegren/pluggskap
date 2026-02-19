import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema({
  name: { type: String },
    animal: {
      name: { type: String },
      weight: { type: String },
      height: { type: String },
      food: { type: String },
      sound: { type: String },
      image: { type: String }
     },
    bird: {
      name: { type: String },
      weight: { type: String },
      wingspan: { type: String },
      stay: { type: Boolean },
      food: { type: String },
      sound: { type: String },
      image: { type: String }
    },
    food: {
      name: { type: String },
      description: { type: String },
      recipeLink: { type: String },
      image: { type: String }
    },
    plant: {
     name: { type: String },
     type: { type: String },
     season: { type: String },
     protected: { type: Boolean },
     image: { type: String }
    }
})

module.exports = mongoose.model('province', provinceSchema)
