const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = 3300;
const wheatherData = require('../utils/wheatherData')
const publicStaticPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views');
const partialsPAth = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPAth)
app.use(express.static(publicStaticPath));

app.use(express.static(publicStaticPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App'
    })
})

//localhost://3300/whaether/?address=cityname
app.get('/wheather', (req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:'You must enter address in search box'
        })
    }
   wheatherData(address,(error, {temperature,description,cityName} = {})=>{
    //    console.log(result);
    if(error){
        return res.send({
            error:error
        })
    }
    console.log(temperature,description,cityName)
    res.send({
        temperature,
        description,
        cityName
    })
   })
});

app.get('*', (req,res)=>{
    res.render('404',{
        title:'Pagenot found'
    })
})

app.listen(port, ()=>{
    console.log('server is server on port',port)
})