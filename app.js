const express=require("express");
const app=express();
const https=require("https");
const bp=require("body-parser");
app.use(bp.urlencoded({extended:true}));
require('dotenv').config();

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res)
{
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+process.env.apikey+"&units="+unit+"";
    //for process.env.apikey to work npm install dot env and require('dotenv').config();

    https.get(url,function(resp)
    {
        console.log(resp.statusCode);
        resp.on("data",function(data)
        {
            const weatherData=JSON.parse(data);
            //console.log(weatherData);
            const temp=weatherData.main.temp;
            console.log(temp);
            const desc=weatherData.weather[0].description;
            const flike=weatherData.main.feels_like;
            const tmin=weatherData.main.temp_min;
            const tmax=weatherData.main.temp_max;
            const hdity=weatherData.main.humidity;
            const vis=weatherData.visibility;
            const wspd=weatherData.wind.speed;

            console.log(desc);
            const icon=weatherData.weather[0].icon;
            const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";    
            res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius</h1>");
            res.write("<h3>The weather is currently "+desc+"</h3>");
            res.write("<img src="+imgUrl+">");
            res.write("<h2>Feels like "+flike+"</h2>");
            res.write("<h2>Max Temperature: "+tmax+"degree celcius</h2>");
            res.write("<h2>Min Temperature: "+tmin+" degree celcius</h2>");
            res.write("<h2>Humidity: "+hdity+"</h2>");
            res.write("<h2>Visibility: "+vis+"km</h2>");
            res.write("<h2>Wind speed "+wspd+"kmph</h2>");
            res.send();
        })
    });
})



/*
    const query="Kolkata";
  
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+"";
    
    https.get(url,function(resp)
    {
        console.log(resp.statusCode);
        resp.on("data",function(data)
        {
            const weatherData=JSON.parse(data);
            //console.log(weatherData);
            const temp=weatherData.main.temp;
            console.log(temp);
            const desc=weatherData.weather[0].description;
            console.log(desc);
            const icon=weatherData.weather[0].icon;
            const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";    
            res.write("<h1>The temperature in Kolkata is "+temp+" degree celcius</h1>");
            res.write("<h3>The weather is currently "+desc+"</h3>");
            res.write("<img src="+imgUrl+">");
            res.send();
        })
    });
    */

app.listen(3000,function()
{
    console.log("Server running on port 3000");
});