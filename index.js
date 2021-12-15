const dotenv = require("dotenv");
const express = require("express");
const cheerio=require('cheerio')
dotenv.config({path:'./.env'})

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

const Shoes=[
    {
        "id":1,
        "name":"Wild Rider Layers Unisex Sneakers",
        "price":121,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/02/sv01/fnd/IND/fmt/png/,Wild-Rider-Layers-Unisex-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
        "quantity":1
        
       
    },
    {
        "id":2,
        "name":"Wild Rider Layers 2 Unisex Sneakers",
        "price":151,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/03/sv01/fnd/IND/fmt/png/Wild-Rider-Layers-Unisex-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":3,
        "name":"Wild Rider Layers Unisex3 sneakers",
        "price":161,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/01/sv01/fnd/IND/fmt/png/Wild-Rider-Layers-Unisex-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":4,
        "name":"PUMA Serve Pro Lite Unisex shoes",
        "price":261,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374902/01/sv01/fnd/IND/fmt/png/PUMA-Serve-Pro-Lite-Unisex-Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":5,
        "name":"PUMA Serve Pro Lite Unisex",
        "price":321,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374902/11/sv01/fnd/IND/fmt/png/PUMA-Serve-Pro-Lite-Unisex-Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":6,
        "name":"one8 Virat Kohli Basket Classice Unisex Sneakers",
        "price":371,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/375314/01/sv01/fnd/IND/fmt/png/one8-Virat-Kohli-Basket-Classic-Unisex-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":7,
        "name":"Caracal SoftFoam+Sneakers",
        "price":171,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/369863/18/sv01/fnd/IND/fmt/png/Caracal-SoftFoam+-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":8,
        "name":"Mirage Mox Brightly Packed Shoes",
        "price":271,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/375168/01/sv01/fnd/IND/fmt/png/Mirage-Mox-Brightly-Packed-Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":9,
        "name":"Future Rider Play On Unisex Sneakers",
        "price":571,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/69/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":10,
        "name":"Future Rider2 Play On Unisex Sneakers",
        "price":671,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/68/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":11,
        "name":"Future Rider3 Play On Unisex Sneakers",
        "price":371,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/72/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":12,
        "name":"Rebound Lay-Up Lo SoftFoam+Mesh Shoes",
        "price":971,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/370914/01/sv01/fnd/IND/fmt/png/Rebound-Lay-Up-Lo-SoftFoam+-Mesh-Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":13,
        "name":"one8 Virat Kohli Basket Classic Unisex Sneakers",
        "price":451,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1500,h_1500/global/375314/02/sv01/fnd/IND/fmt/png/one8-Virat-Kohli-Basket-Classic-Unisex-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":14,
        "name":"Mirage Mox Brightly Packed Shoes",
        "price":271,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/375168/01/sv01/fnd/IND/fmt/png/Mirage-Mox-Brightly-Packed-Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":15,
        "name":"PUMA Backcourt IMEVA Mid Sneakers",
        "price":556,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/374139/01/sv01/fnd/IND/fmt/png/PUMA-Backcourt-IMEVA-Mid-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":16,
        "name":"Redon Move Shoes",
        "price":771,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/185999/02/sv01/fnd/IND/fmt/png/Redon-Move--Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":17,
        "name":"Puma Perforated Low Men's IDP Shoes",
        "price":871,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/372981/01/sv01/fnd/IND/fmt/png/Puma-Perforated-Low-Men's--IDP-Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":18,
        "name":"RS-2K Internet Exploring Sneakers",
        "price":971,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/373309/21/sv01/fnd/IND/fmt/png/RS-2K-Internet-Exploring-Sneakers",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":19,
        "name":"X-Ray 2 Square IMEVA SoftFoam+ Shoes",
        "price":271,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/373108/13/sv01/fnd/IND/fmt/png/X-Ray-2-Square-IMEVA-SoftFoam+-Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
    {
        "id":20,
        "name":"Future Rider International Game Shoes",
        "price":171,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/375971/01/sv01/fnd/IND/fmt/png/Future-Rider-International-Game-Shoes",
        "description":'With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.',
                "quantity":1
       
    },
]

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
