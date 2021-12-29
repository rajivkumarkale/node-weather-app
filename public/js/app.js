console.log('client side js file is loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#temperature');
const messageTwo = document.querySelector('#description');
const messageThree = document.querySelector('#location');

messageOne.textContent = '';
messageTwo.textContent = '';
messageThree.textContent = '';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
                return;
            }
            messageOne.textContent = data.temperature;
            messageTwo.textContent = data.description;
            messageThree.textContent = data.location;
        })
    })

})