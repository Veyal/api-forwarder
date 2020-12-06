const env = require("./env.json");

const express = require('express');
const axios= require("axios");
const app = express();
app.use(express.json());

const apis = require('./api.json');
apis.forEach((api)=>{
    app.post(api.url,(req,res)=>{
        let cont = true;
        api.requiredBody.forEach(b=>{
            if(!req.body[b]){
                res.json("Invalid param");
                cont = false;
            }
        });
        if(cont){
            const options = {
                headers : {"user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}
            }
            axios.post(api.targetUrl,req.body,options).then(response=>{
                res.json(response.data);
            })
        }
    })
})

app.listen(env.server.port,()=>{
    console.log(`listening on port ${env.server.port}`)
})