import mongoose from 'mongoose'

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log('MongoDB Connected (BORRAR ESTO DE LIB)')
  } catch (error) {
    console.log(error)
  }
}

export default connection
