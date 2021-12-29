const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

app.use(express.static(path.join(__dirname,'../public/')));

app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather app',
        name: 'Rajiv Kumar Kale'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Rajiv Kumar Kale'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name:'Rajiv Kumar Kale',
        message: 'Help is always provided to those who needs it in hogwarts'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address not provided'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error, {temperature, description}={}) => {
            if(error){
                return res.send({
                    error: 'address not provided'
                });
            }
            res.send({
                temperature, 
                description,
                location
            });
        });    
    });
});

app.get('/products', (req, res)=>{
    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        error:'help article not found',
        title:'404 error',
        name: 'Rajiv Kumar Kale'
    });
})

app.get('*', (req, res)=>{
    res.render('404', {
        error: 'Page not found',
        title:'404 error',
        name: 'Rajiv Kumar Kale'
    });
});

app.listen(3000, ()=>{
    console.log('server is up on port 3000');
});