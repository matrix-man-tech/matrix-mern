import mongoose from 'mongoose'

const addressSchema = mongoose.Schema({
  address: { type: String, requred: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
})


export { addressSchema}