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
        "description":"With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family. We've layered a rich mix of premium leather, suede and hairy suede onto a nylon upper to create texture and a raw edgy look that is pure street. The IMEVA midsole and rubber outsole ensure combined lightweight comfort and great traction to take you forward, further and faster through your day and beyond.",
        "quantity":1
        
       
    },
    {
        "id":2,
        "name":"Mercedes Kart Cat-X Tech Unisex Sneakers",
        "price":151,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/306557/01/sv01/fnd/IND/fmt/png/Mercedes-Kart-Cat-X-Tech-Unisex-Sneakers",
        "description":"Premium material and tech features are given a branded boost from German engineering. The Mercedes Kart Cat-X Tech Unisex Sneakers areleant style and esteem by Mercedes-AMG Petronas Motorsport. The piece rises to the occasion with an all-leather upper.",
                "quantity":1
       
    },
    {
        "id":3,
        "name":"Jako Slip-On Men's Shoes",
        "price":161,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/381374/01/sv01/fnd/IND/fmt/png/Jako-Slip-On-Men's-Shoes",
        "description":"The Jako Slip-On Men's Shoes are perfect for a laceless running style. Lightweight and styled for everyday wear, they feature a breathable and durable mesh upper. Layered cushioning adds comfort that goes the distance.",
                "quantity":1
       
    },
    {
        "id":4,
        "name":"PUMA Serve Pro Lite Unisex shoes",
        "price":261,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374902/01/sv01/fnd/IND/fmt/png/PUMA-Serve-Pro-Lite-Unisex-Shoes",
        "description":"Catering to the growing consumer expectation for casual, everyday comfort, the Serve Pro Lite Trainers feature shock-absorbing support for lightweight luxury.",
                "quantity":1
       
    },
    {
        "id":5,
        "name":"Electron E Unisex Shoes",
        "price":321,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/380435/04/sv01/fnd/IND/fmt/png/Electron-E-Unisex-Shoes",
        "description":"There's more to the Electron E Trainers than meets the eye. Its visible technology highlights fantastic features like a breathable mesh upper, synthetic quarter panels for support and a bold aesthetic that's both fun and futuristic. The elastic band on the heel provides extra comfort.",
                "quantity":1
       
    },
    {
        "id":6,
        "name":"one8 Virat Kohli Basket Classice Unisex Sneakers",
        "price":371,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/375314/01/sv01/fnd/IND/fmt/png/one8-Virat-Kohli-Basket-Classic-Unisex-Sneakers",
        "description":"This one is for the collectors,connoisseur & extreme uber cool, the one8 Virat Kohli Basket Classic one8 V3 pays homage to the illustrious career of the legend himslef",
                "quantity":1
       
    },
    {
        "id":7,
        "name":"Caracal SoftFoam+Sneakers",
        "price":171,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/369863/18/sv01/fnd/IND/fmt/png/Caracal-SoftFoam+-Sneakers",
        "description":"Long, clean lines, a premium leather upper and a tennis-inspired silhouette make the Caracal Sneakers your go-to for sleek style, whether you're on or off the court.",
                "quantity":1
       
    },
    {
        "id":8,
        "name":"Mirage Mox Brightly Packed Shoes",
        "price":271,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/375168/01/sv01/fnd/IND/fmt/png/Mirage-Mox-Brightly-Packed-Shoes",
        "description":"The Mirage Mox takes design cues from a 1970s pair of PUMA running shoes and transforms them with textural contrasts, pops of colour and funky futuristic elements. Inspired by illusions and the space between what's real and otherworldly, it's ready for new realities. Incorporating caution tape elements for a deconstructed approach to this season's trends, the Brightly Packed iteration features premium materials for a sophisticated silhouette that will have you rocking retro with cool confidence",
                "quantity":1
       
    },
    {
        "id":9,
        "name":"Future Rider Play On Unisex Sneakers",
        "price":571,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/69/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
        "description":"Keep the game going in the shoe that launched a movement, our Future Rider Play On Unisex Sneakers. This shoe is dedicated to pared-down performance, featuring a super-light nylon, suede and leather upper and our famous shock-absorbing Federbein outsole to keep you pounding the pavement in style.",
                "quantity":1
       
    },
    {
        "id":10,
        "name":"Anzarun Lite Unisex Sneakers",
        "price":671,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/371128/23/sv01/fnd/IND/fmt/png/Anzarun-Lite-Unisex-Sneakers",
        "description":"The freshest look for any occasion, the Anzarun Lite Trainers are PUMA's most refined shoe yet. Featuring the breezy Anzarun DNA mesh upper, a cushy SoftFoam+ sockliner and discreet PUMA branding throughout, you're sure to look great, wherever the day takes you.",
                "quantity":1
       
    },
    {
        "id":11,
        "name":"Pacer Next Cage Shoes",
        "price":371,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/365284/01/sv01/fnd/IND/fmt/png/Pacer-Next-Cage-Shoes",
        "description":"With a foot-hugging mesh upper and a supportive lace-through midfoot caging system, the Pacer Next Cage has a sleek silhouette that is as ready for the gym as it is for the streets. A feather-light midsole provides superior energy return, cushioning and support, while slip-on construction adds a sock-like rather than a shoe-like feel. You won’t want to leave home in anything else.",
                "quantity":1
       
    },
    {
        "id":12,
        "name":"Rebound Lay-Up Lo SoftFoam+Mesh Shoes",
        "price":971,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/370914/01/sv01/fnd/IND/fmt/png/Rebound-Lay-Up-Lo-SoftFoam+-Mesh-Shoes",
        "description":"Rethink the basketball trainer with the Rebound Lay-Up. This versatile sneaker features a mesh upper for superior breathability and a SoftFoam+ sockliner to give you a supportive fit. Paired with the iconic PUMA Formstrip, you’ll have classic style with all of the innovation of today.",
                "quantity":1
       
    },
    {
        "id":13,
        "name":"one8 Virat Kohli Basket Classic Unisex Sneakers",
        "price":451,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1500,h_1500/global/375314/02/sv01/fnd/IND/fmt/png/one8-Virat-Kohli-Basket-Classic-Unisex-Sneakers",
        "description":"This one is for the collectors,connoisseur & extreme uber cool, the one8 Virat Kohli Basket Classic one8 V3 pays homage to the illustrious career of the legend himslef",
                "quantity":1
       
    },
    {
        "id":14,
        "name":"PUMA x 1DER Columbus Men's Shoes",
        "price":271,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/387768/01/sv01/fnd/IND/fmt/png/PUMA-x-1DER-Columbus-Men's-Shoes",
        "description":'Crafted for the ones who love an active life while looking stylish, PUMA and KL Rahul bring you the Columbus Men's Shoes. Enveloping KL Rahul's bold and sophisticated style, the contrasting overlays add edge to the overall look of PUMA x 1DER Columbus Men's Shoes. Even though the PUMA and 1DER logos are subtle, they are unmissable.',
                "quantity":1
       
    },
    {
        "id":15,
        "name":"BMW M Motorsport City Rider Sneakers",
        "price":556,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1500,h_1500/global/306975/01/sv01/fnd/IND/fmt/png/BMW-M-Motorsport-City-Rider-Sneakers",
        "description":"Live life grand with the BMW M Motorsport City Rider Unisex Sneakers. Featuring the signature Rider outsole in combination with the BMW branding. The stunning design adds the edge that'll make any casual look appear out of the world",
                "quantity":1
       
    },
    {
        "id":16,
        "name":"Jamming FUSEFIT Evolution Shoes",
        "price":771,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/366545/01/sv01/fnd/IND/fmt/png/Jamming-FUSEFIT-Evolution-Shoes",
        "description":"Inspired by Spacewalk, the Jamming FUSEFIT Evolution Sneakers take the next step in futuristic design and technology. The combined outsole features a TPU membrane that encapsulates free-floating EVA beads for superior cushioning and the feeling of walking on sand. A unique lacing system gives you endless possibilities for comfort and style. With versatile and adaptive features, these sneakers are the perfect way to overcome any obstacle and propel yourself into new worlds.",
                "quantity":1
       
    },
    {
        "id":17,
        "name":"Puma Perforated Low Men's Shoes",
        "price":871,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/372981/01/sv01/fnd/IND/fmt/png/Puma-Perforated-Low-Men's--IDP-Shoes",
        "description":"Be street ready with the Puma Perforated Low Men's Shoes perfect for leisure and slaying around.",
                "quantity":1
       
    },
    {
        "id":18,
        "name":"RS-X TOYS Unisex Sneakers",
        "price":971,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/369449/24/sv01/fnd/IND/fmt/png/RS-X-TOYS-Unisex-Sneakers",
        "description":"Based on PUMA’s innovative Running System technology, the RS-X line draws its design inspiration from the decade that had the best toys ever, hands down, bar none: the 1980s. Specifically, these RS-X TOYS Unisex Sneakers play on the trend of the toys of our childhood ultimately becoming collector’s items down the road. The mesh upper on these Sneakers promote air flow, and features colours that would be at home in a crowded video arcade from 30 years ago. A unique cushioning function provides support, and the rubber outsole offers supreme traction and grip.",
                "quantity":1
       
    },
    {
        "id":19,
        "name":"X-RAY² Ramble Unisex Shoes",
        "price":271,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/380727/06/sv01/fnd/IND/fmt/png/X-RAY%C2%B2-Ramble-Unisex-Shoes",
        "description":'Take to the urban outdoors in the X-Ray² Ramble Trainers. PUMA’s signature street style just got rugged, with technical fabrics like ripstop and suede, robust eyestay webbing straps and discreet branding. So, of course, the shoe looks fierce - but with the full-on comfort of Softfoam+, this hiking hybrid feels amazing too.',
                "quantity":1
       
    },
    {
        "id":20,
        "name":"RS-X³ Twill Air Mesh Shoes",
        "price":171,
        "image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1500,h_1500/global/368845/02/sv01/fnd/IND/fmt/png/RS-X%C2%B3-Twill-Air-Mesh-Shoes",
        "description":"Dare to be bold. We've rebooted the RS design to take it to a whole new level. We've stripped it back to down basics and rebuilding it with more extreme mixes of colour and materials for a 3x stronger retro-meets-the-future look. PUMA's Running System is the engine under the bonnet, providing comfort and cushioning with every step.",
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
