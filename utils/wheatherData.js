const request = require('request')
const constants = require('../config');

const wheatherData = (address,callback)=>{
    const url = constants.openWheatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWheatherMap.SECRET_KEY;
    console.log(url)
    // callback(true)
    request({url, json:true}, (error, {body})=>{
        // console.log(body);
        if(error){
            callback('cant fetch data from open wheather map api', undefined)
        }else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback('unable to find required data, try another location',undefined);
        }else{
            callback(undefined, {
                temperature:body.main.temp,
                description: body.weather[0].description,
                cityName:body.name
            })
        }
    })
}

module.exports = wheatherData;