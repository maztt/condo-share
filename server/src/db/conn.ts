import mongoose from 'mongoose'

async function databaseConnection (): Promise<void> {
    await mongoose
    .connect('mongodb://127.0.0.1:27017/condoshare')
    .then(() => {
        console.log('Connected to the database!')
    })
    .catch(err => {
        console.error('Error while trying to connect to the database: ', err)
    })
}

databaseConnection()

export default mongoose
