const request = require('request');

const forecast = (latitude,longitude, callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=2311b80a79922273db37cc945c6b4b9b';
    request({url,json:true}, (err, {body})=>{
        if(err){
            callback('Unable to connect to weather service',undefined);
        }
        if(body.main && body.main.temp){
            const data = {
                temperature : body.main.temp,
                description : body.weather[0].description
            };
            callback(undefined, data);
        }
        else{
            callback('Unable to find location!', undefined);
        }
    });
};


module.exports = forecast;