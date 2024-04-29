//const { name } = require("ejs");

const socket=io('http://localhost:8000');


const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.main');

var audio =new Audio('pika.mp3');

const append=(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('mes');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
   if(position=='left'){

    audio.play();
   }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';

})





const namee = prompt("Enter your name to join");
socket.emit('new-user-joined',namee);

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'left');
})
socket.on('receive',data=>{
   // console.log("ggg");
   //console.log(`${data.name}: ${data.message}`);
    append(`${data.name}: ${data.message}`,'left');
   
})
socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})
