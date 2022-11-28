const dotenv = require("dotenv");
const express = require("express");
const cheerio=require('cheerio')
const Shoes=require('./data');


dotenv.config({path:'./.env'})


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());



app.get('/',(req,res)=>{
    res.send('Welcome to the shoescollections api...')
})

app.get('/shoes',(req,res)=>{
    res.send(Shoes)

    
})
app.get('/shoes/:id',(req,res)=>{
    let shoes=Shoes.find(c=>c.id===parseInt(req.params.id))
    if(!shoes) res.status(404).send('The course with the given id was not found')
    res.send(shoes)
})



app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
