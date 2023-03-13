const express=require('express')
const mongoose=require('mongoose')
 const swaggerJsdoc= require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const options = require('./swagger')

const route=require('./routes/route')

const app=express()

app.use(express.json())


const swaggerDocs = swaggerJsdoc(options)
console.log(swaggerDocs);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://HarshJain:harsh321@cluster0.dwkz9.mongodb.net/webelite-db').
then(()=>console.log('mongoDb is connected')).
catch((err)=>console.log(err))


app.use('/',route)


app.listen(process.env.PORT||3000,function(){
      console.log('Express aap is running on PORT'+(process.env.PORT||3000))
})

