//const { name } = require("ejs");

const socket=io('http://localhost:8000');
// const socket=io('https://vartalappp-b6wwghlpt-himanshirana2403s-projects.vercel.app/');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.main');

var audio =new Audio('pika.mp3');

// const append=(message,position)=>{
//     const messageElement =document.createElement('div');
//     messageElement.innerText=message;
//     messageElement.classList.add('mes');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
//    if(position=='left'){

//     audio.play();
//    }
// }
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('mes');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    // Play notification sound if the message is from the left (not the user)
    if (position === 'left') {
        audio.play();
    }

    // Scroll to the bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
};


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    if(message!='')
    {
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
    }
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
