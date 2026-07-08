import express from 'express'
import dotenv from "dotenv"
import { conectionMongo} from './backend/src/config/dataBase.js'



//dependencia para acceder a las variables de entorno
const app = express()
dotenv.config()

const port = process.env.PORT;



app.get('/', (req, res) => {
  res.send('hola desde servidor express')
})

app.listen(3000, () => {
  console.log(`el servidor esta conectado en http://localhost:${port}`)
})