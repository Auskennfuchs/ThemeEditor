import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import ThemeRoutes from './routes/ThemeRoutes'

dotenv.config()

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    } catch (e) {
        console.log("error connecting to monoDB", e)
    }
    mongoose.Promise = Promise
    const app = express()
    app.use(bodyParser.json())
    app.use('/themes', ThemeRoutes)
    app.listen(4000, () => console.log('running on localhost:4000'))
}

run()